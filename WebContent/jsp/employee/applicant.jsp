<%@ page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript">
	var applicantGrid = new applicantGridPanel();
	tabId = Ext.getCmp('mainTab').getActiveTab().id.split('_')[1];
	juage(tabId,"applicant",applicantGrid,"applicant");
</script>
<div id="applicant"></div>