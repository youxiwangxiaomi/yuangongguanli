package com.hrmsys.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.transaction.annotation.Transactional;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.hrmsys.bean.EmployeeBean;
import com.hrmsys.bean.PageBean;
import com.hrmsys.dao.EmployeeDAO;
import com.hrmsys.enums.StaticValue;
import com.hrmsys.model.Department;
import com.hrmsys.model.Employee;
import com.hrmsys.service.EmpService;
import com.hrmsys.util.ConditionValidate;
import com.hrmsys.util.FileExport;

public class EmpServiceImpl implements EmpService {

	private EmployeeDAO empDAO;

	@Override
	public int findNumByDept(Department dept) {
		List<Employee> emps = empDAO.findByDept(dept);
		if (emps != null)
			return emps.size();
		return 0;
	}

	public EmployeeDAO getEmpDAO() {
		return empDAO;
	}

	public void setEmpDAO(EmployeeDAO empDAO) {
		this.empDAO = empDAO;
	}

	@Override
	public String getAll(String start, String limit) {
		List<Employee> emps = empDAO.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		String json = null;
		if (emps.size() != 0) {
			json = JSONArray.fromObject(emps).toString();
		}
		int totalProperty = empDAO.findTotal(Employee.class);
		return "{totalProperty:"+totalProperty+",root:"+json+"}";
	}

	@Override
	public String findByDeptId(String deptId) {
		Department dept = new Department();
		dept.setDeptId(deptId);
		List<Employee> emps = empDAO.findByDept(dept);
		String json = JSONArray.fromObject(emps).toString();
		return json;
	}

	@Override
	public String getByHQL(String deptId, String condition,
			String conditionValue, String start, String limit) {
		
		PageBean pageBean = empDAO.findByHQL(deptId, condition,
				conditionValue, Integer.parseInt(start), Integer.parseInt(limit));
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{totalProperty:"+pageBean.getTotalProperty()+",root:"+json+"}";
	}
	@Override
	public String getByHQLS(String deptId, String condition,
			String conditionValue, String start, String limit) {
		
		PageBean pageBean = empDAO.findByHQLS(deptId, condition,
				conditionValue, Integer.parseInt(start), Integer.parseInt(limit));
		String json = JSONArray.fromObject(pageBean.getRoot()).toString();
		return "{totalProperty:"+pageBean.getTotalProperty()+",root:"+json+"}";
	}

	@Override
	public String save(Employee emp) {
		if (empDAO.saveOrUpdate(emp)) {
			return StaticValue.SAVE_SUCCESS;
		}
		return StaticValue.SAVE_FAILURE;
	}

	@Override
	public String uploadPhoto(String savePath, File upload) {
		boolean flag = true;
		String msg = null;
		try {
			FileOutputStream fos = new FileOutputStream(savePath);
			FileInputStream fis = new FileInputStream(upload);
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = fis.read(buffer)) > 0) {
				fos.write(buffer, 0, len);
			}
		} catch (FileNotFoundException e) {
			flag = false;
			e.printStackTrace();
		} catch (IOException e) {
			flag = false;
			e.printStackTrace();
		} finally {
			if (flag) {
				msg = StaticValue.UPLOAD_SUCCESS;
			} else {
				msg = StaticValue.UPLOAD_FAILURE;
			}
		}
		return msg;
	}

	@Override
	public String isExistByEmpId(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		if(null != emp){
			return emp.getEmpName();
		}
		return "";
	}

	@Override
	public String unique(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		if(null != emp){
			return JSONArray.fromObject(emp).toString();
		}
		return "";
	}
	
	@Override
	public String delete(String ids, String filePath) {
		String[] empIds = ids.split(",");
		for(String empId : empIds){
			Employee emp = empDAO.findByEmpId(empId);
			String urlPath = emp.getEmpPhoto();
			if(urlPath.indexOf("default.gif") < 0){ //默认图片不删除 
				int position = urlPath.lastIndexOf("/");
				File file=new File(filePath +"\\"+ urlPath.substring(position, urlPath.length()));
				 if(file.exists() && file.isFile())
				  file.delete();
			}
		}
		if(empDAO.deleteByEmpId(empIds)){
			return StaticValue.DELETE_SUCCESS;
		}
		return StaticValue.DELETE_FAILURE;
	}

	/*@Override
	public String listByEmpId(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		System.out.println(JSONArray.fromObject(emp).toString());
		return JSONArray.fromObject(emp).toString();
	}	*/
	
	public String listByEmpId(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		
		
		JSONArray ad = JSONArray.fromObject(emp);
		JSONObject   jsonObject = (JSONObject)ad.get(0);
		if(emp.getEmpIdcard()== null || emp.getEmpPhoto() == ""){
			jsonObject.put("idcardIdentification", "失败，没有身份证号");
		}else{
			jsonObject.put("idcardIdentification", "通过");
			if(emp.getEmpPhoto() == null || emp.getEmpPhoto() == ""){
				jsonObject.put("faceIdentification", "失败，没有上传照片");
			}else{
				jsonObject.put("faceIdentification", "通过");
			}
		}
		
		List emps = findByJobIdDeptId(emp.getJob().getJobId(),emp.getDepartment().getDeptId());
		String offerAdvice = "该部门该职位暂时没有人，建议：录用";
		for (Object object : emps) {
			
			Employee employee = (Employee)object;
			
			if(employee.getStatus() == null){
				offerAdvice = "该部门该职位已经有人了，建议：拒绝";
				break;
			}
			
		}
		jsonObject.put("offerAdvice", offerAdvice);
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(jsonObject);
		System.out.println(JSONArray.fromObject(jsonArray).toString());
		return JSONArray.fromObject(jsonArray).toString();
	}


	public List<EmployeeBean> packageEmp(List<Employee> emps) {
		List<EmployeeBean> empBeans = new ArrayList<EmployeeBean>();
		for(Employee emp : emps){
			EmployeeBean empBean = new EmployeeBean();
			empBean.setEmpAccount(emp.getEmpAccount());
			empBean.setEmpAddress(emp.getEmpAddress());
			empBean.setEmpBank(emp.getEmpBank());
			empBean.setEmpBirth(emp.getEmpBirth());
			empBean.setEmpEducation(emp.getEmpEducation());
			empBean.setEmpEmail(emp.getEmpEmail());
			empBean.setEmpId(emp.getEmpId());
			empBean.setEmpIdcard(emp.getEmpIdcard());
			empBean.setEmpMobilephone(emp.getEmpMobilephone());
			empBean.setEmpName(emp.getEmpName());
			empBean.setEmpNation(emp.getEmpNation());
			empBean.setEmpNationality(emp.getEmpNation());
			empBean.setEmpOrigin(emp.getEmpOrigin());
			empBean.setEmpPhoto(emp.getEmpPhoto());
			empBean.setEmpPost(emp.getEmpPost());
			empBean.setEmpProfession(emp.getEmpProfession());
			empBean.setEmpQq(emp.getEmpQq());
			empBean.setEmpSchool(emp.getEmpSchool());
			if(emp.getEmpSex() == 1){
				empBean.setEmpSex("男");
			}else{
				empBean.setEmpSex("女");
			}
			empBean.setEmpTelephone(emp.getEmpTelephone());
			empBean.setJob(emp.getJob().getJobName());
			empBean.setDept(emp.getDepartment().getDeptName());
			empBeans.add(empBean);
		}
	
		return empBeans;
	}

	@Override
	public void pdfExport(String empId, HttpServletResponse response, String filename, String jasper) {
		Employee emp = null;
		List<Employee> emps = new ArrayList<Employee>();
		if(!"all".equals(empId) && ConditionValidate.isEmpty(empId)){
			emp = empDAO.findByEmpId(empId);
			emps.add(emp);
		}else{
			emps = empDAO.findAll(Employee.class);
		}
		List<EmployeeBean> empBeans = packageEmp(emps);
		FileExport fileExport = new FileExport();
		fileExport.exportPDF(empBeans, filename,jasper, response);
		
	}

	@Override
	public List<EmployeeBean> getEmpList(String empId) {
		List<Employee> emps = new ArrayList<Employee>();
		Employee emp = empDAO.findByEmpId(empId);
		emps.add(emp);
		return this.packageEmp(emps);
	}

	@Override
	public void xlsExport(HttpServletResponse response, String filename) {
		List<Employee> emps = empDAO.findAll(Employee.class);
		List<EmployeeBean> empBeans = this.packageEmp(emps);
		FileExport fileExport = new FileExport();
		fileExport.exportXls(empBeans, filename, response);
	}

	@Override
	@Transactional
	public String applicantPass(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		emp.setStatus("app");
		empDAO.saveOrUpdate(emp);
		return StaticValue.SAVE_SUCCESS;
	}

	@Override
	public Employee getEmployee(String empId) {
		Employee emp = empDAO.findByEmpId(empId);
		return emp;
	}

	@Override
	public String delete(String[] ids) {
		if(empDAO.deleteByEmpId(ids)){
			return StaticValue.DELETE_SUCCESS;
		}else{
			return StaticValue.DELETE_FAILURE;
		}
		
	}

	@Override
	public List<Employee> findByJobIdDeptId(int jobId, String deptId) {
		List a = empDAO.findByJobIdDeptId(jobId, deptId);
		return a;
	}

}