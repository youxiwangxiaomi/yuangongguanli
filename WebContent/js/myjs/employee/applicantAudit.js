/**
 * 显示职员
 * 
 * @author sux 2011-02-28
 * @param {Object}
 *            width
 * @memberOf {TypeName}
 */
ApplicantDetailWin = Ext.extend(Ext.Window, {
	id : 'applicantDetailWinId',
	constructor : function() {
		var applicantDetail = new ApplicantDetail();
		EmpUpdateWin.superclass.constructor.call(this, {
			modal : true,
			width : 825,
			title : '人员详细信息',
			items : [ applicantDetail ]
		});
	}
})

ApplicantDetail = Ext.extend(Ext.form.FormPanel, {
	id : 'applicantDetailId',
	// 构造方法中的width参数为TabPanel的宽度
	constructor : function(width) {
		width = (width - 750) / 2;
		Ext.QuickTips.init();
		var reader = new Ext.data.JsonReader({}, [ {
			name : 'emp.empId',
			mapping : 'empId'
		}, {// json时间格式转为ext,time为json中显示的一部分
			name : 'emp.empBirth',
			mapping : 'empBirth.time',
			dateFormat : 'time',
			type : 'date'
		}, {
			name : 'emp.empSex',
			mapping : 'empSex',
			convert : function(value) {
				if (value == 1)
					return "男";
				else
					return "女";
			}
		}, {
			name : 'emp.empQq',
			mapping : 'empQq'
		}, {
			name : 'emp.empPost',
			mapping : 'empPost'
		}, {
			name : 'emp.empBank',
			mapping : 'empBank'
		}, {
			name : 'emp.empNationality',
			mapping : 'empNationality'
		}, {
			name : 'emp.empSchool',
			mapping : 'empSchool'
		}, {
			name : 'emp.empName',
			mapping : 'empName'
		}, {
			name : 'emp.empTelephone',
			mapping : 'empTelephone'
		}, {
			name : 'emp.empEmail',
			mapping : 'empEmail'
		}, {
			name : 'emp.empMobilephone',
			mapping : 'empMobilephone'
		}, {
			name : 'emp.empIdcard',
			mapping : 'empIdcard'
		}, {
			name : 'emp.empAccount',
			mapping : 'empAccount'
		}, {
			name : 'emp.empOrigin',
			mapping : 'empOrigin'
		}, {
			name : 'emp.empEducation',
			mapping : 'empEducation'
		}, {
			name : 'emp.empPhoto',
			mapping : 'empPhoto',
			convert : function(v) {
				if (v != '')
					Ext.get('emp_photo').dom.src = v;
			}
		}, {
			name : 'emp.empNation',
			mapping : 'empNation'
		}, {
			name : 'emp.empProfession',
			mapping : 'empProfession'
		}, {
			name : 'emp.empAddress',
			mapping : 'empAddress'
		}, {
			name : 'deptName',
			mapping : 'department.deptName'
		}, {
			name : 'jobName',
			mapping : 'job.jobName'
		}, {
			name : 'emp.idcardIdentification',
			mapping : 'idcardIdentification'
		}, {
			name : 'emp.faceIdentification',
			mapping : 'faceIdentification'
		}, {
			name : 'emp.status',
			mapping : 'status'
		} , {
			name : 'emp.offerAdvice',
			mapping : 'offerAdvice'
		} ])
		ApplicantDetail.superclass.constructor.call(this, {
			// var windowWidth = window.screen.availWidth;获取屏幕宽度
			// bodyStyle: 'margin-left:'+width+';', //将下面的panel显示在中间
			frame : true,
			reader : reader,
			items : [ {
				width : 768,
				html : '<center><h1>应聘人员信息</h1></center><br/>'
			}, {
				xtype : 'fieldset',
				title : '个人信息',
				defaults : {
					bodyStyle : 'padding-right: 30px;'
				},
				width : 768,
				layout : 'table',// 表格布局
				labelAlign : 'right',
				labelWidth : 60,
				frame : true,
				layoutConfig : {// 3列
					columns : 3
				},
				items : [ {
					layout : 'form',
					// columnWidth: .33, // column列布局
					defaults : {
						xtype : 'textfield',
						width : 150
					},
					items : [ {
						id :'status',
						fieldLabel : '人员状态',
						name : 'emp.status',
						style : 'background: #dfe8f6;',
						hidden : true
					},{
						id :'empId',
						fieldLabel : '人员编号',
						name : 'emp.empId',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						xtype : 'datefield',
						fieldLabel : '出生日期',
						name : 'emp.empBirth',
						format : 'Y-m-d',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						xtype : 'textfield',
						fieldLabel : 'QQ',
						name : 'emp.empQq',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						id :'empSex',
						fieldLabel : '性别',
						xtype : 'textfield',
						name : 'emp.empSex',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						xtype : 'numberfield',
						fieldLabel : '邮编',
						name : 'emp.empPost',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '开户银行',
						name : 'emp.empBank',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '国籍',
						name : 'emp.empNationality',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '毕业学校',
						name : 'emp.empSchool',
						style : 'background: #dfe8f6;',
						readOnly : true
					} ]
				}, {
					layout : 'form',
					// columnWidth: .33,
					defaults : {
						xtype : 'textfield',
						width : 150
					},
					items : [ {
						fieldLabel : '姓名',
						name : 'emp.empName',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '电话',
						name : 'emp.empTelephone',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : 'e-mail',
						emptyText : '不能为空',
						name : 'emp.empEmail',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '手机',
						name : 'emp.empMobilephone',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '身份证',
						name : 'emp.empIdcard',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						xtype : 'numberfield',
						fieldLabel : '开户账号',
						name : 'emp.empAccount',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '籍贯',
						name : 'emp.empOrigin',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						fieldLabel : '学历',
						name : 'emp.empEducation',
						style : 'background: #dfe8f6;',
						readOnly : true
					} ]
				}, {
					// rowspan: 5,
					layout : 'form',
					defaults : {
						xtype : 'textfield',
						width : 150
					},
					items : [ {
						xtype : 'textfield', // 注意此处为textfield,
						// inputType: 'image'
						fieldLabel : '照片',
						inputType : 'image',
						width : 130,
						height : 125,
						id : 'emp_photo',
						autoCreate : {
							tag : "input",
							type : "image",
							src : "img/default.gif",
							name : 'emp.empPhoto',
							style : 'background: #dfe8f6;',
							readOnly : true
						// autocomplete: "off"
						}
					}, {
						style : 'margin-left: 110px;',
						xtype : 'panel',
						height : 24,
						width : 50
					}, {
						xtype : 'textfield',
						fieldLabel : '民族',
						name : 'emp.empNation',
						style : 'background: #dfe8f6;',
						readOnly : true
					}, {
						xtype : 'textfield',
						fieldLabel : '专业',
						style : 'background: #dfe8f6;',
						readOnly : true,
						name : 'emp.empProfession'
					} ]
				}, {
					colspan : 3,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '地址',
						width : 640,
						name : 'emp.empAddress',
						style : 'background: #dfe8f6;',
						readOnly : true
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				title : '申请职位信息',
				width : 768,
				layout : 'column',
				defaults : {
					labelWidth : 60,
					labelAlign : 'right'
				},
				items : [ {
					columnWidth : .32,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '部门',
						style : 'background: #dfe8f6;',
						readOnly : true,
						name : 'deptName'
					} ]
				}, {
					columnWidth : .32,
					layout : 'form',
					items : [ {
						xtype : 'textfield',
						fieldLabel : '职位',
						name : 'jobName',
						style : 'background: #dfe8f6;',
						readOnly : true
					} ]
				} ]
			}, {
				id : 'identification',
				hidden : true,
				xtype : 'fieldset',
				title : '身份验证信息',
				width : 768,
				layout : 'column',
				defaults : {
					labelWidth : 60,
					labelAlign : 'right'
				},
				items : [ {
					columnWidth : .32,
					layout : 'form',
					items : [ {
						id : 'idcardIdentification',
						xtype : 'textfield',
						fieldLabel : '身份验证',
						style : 'background: #dfe8f6;',
						name : 'emp.idcardIdentification'
					}, {
						columnWidth : .32,
						layout : 'form',
						items : [ {
							id : 'faceIdentification',
							xtype : 'textfield',
							fieldLabel : '人脸识别',
							name : 'emp.faceIdentification',
							style : 'background: #dfe8f6;',
						} ]
					} ]
				}, ]
			}, {
				id : 'offerAdvice',
				hidden : true,
				xtype : 'fieldset',
				title : '录用建议',
				width : 768,
				layout : 'column',
				defaults : {
					labelWidth : 60,
					labelAlign : 'right'
				},
				items : [ {

					xtype : 'textarea',
					width : 415,
					height : 50,
					name : 'emp.offerAdvice'

				}, ]
			}, {
				xtype : 'panel',
				width : 750,
				buttonAlign : 'center',
				buttons : [ {
					id : 'verify',
					text : '验证',
					handler : this.verify
				}, {
					id : 'pass',
					hidden : true,
					text : '录用',
					handler : this.pass
				}, {
					id : 'refuse',
					hidden : true,
					text : '拒绝',
					handler : this.refuse
				}, ]
			} ]
		});
	},
	verify : function() {
		Ext.getCmp('identification').show();
		if (Ext.getCmp('idcardIdentification').getValue() == '通过'
				&& Ext.getCmp('faceIdentification').getValue() == '通过') {
			Ext.getCmp('offerAdvice').show();
			Ext.getCmp('pass').show();
			Ext.getCmp('refuse').show();
			Ext.getCmp('verify').setVisible(false);
		}
	},
	pass : function() {
		var empId = Ext.getCmp('empId').getValue();
		Ext.Ajax.request({
            url: 'emp_applicantPass.action',
            params: { empId: empId },
            method: 'POST',
            success: function(response, options){
				var datas = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", datas.msg, function(){
					Ext.getCmp('applicantDetailWinId').destroy();
					Ext.getCmp("empInfoapplicant").getStore().load({
						params: {
							deptId: "",
							start: 0,
							limit: 20
						}
					});
				})
				
			},
			failure: function(response, options){
				Ext.Msg.alert("提示", '连接失败', function(){})
			},
        });	
	},
	refuse : function() {
		var empId = Ext.getCmp('empId').getValue();
		Ext.Ajax.request({
            url: 'emp_applicantRefuse.action',
            params: { empId: empId },
            method: 'POST',
            success: function(response, options){
				var datas = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("提示", datas.msg, function(){
					Ext.getCmp('applicantDetailWinId').destroy();
					Ext.getCmp("empInfoapplicant").getStore().load({
						params: {
							deptId: "",
							start: 0,
							limit: 20
						}
					});
				})
				
			},
			failure: saveFailure,
        });	
	}
});
