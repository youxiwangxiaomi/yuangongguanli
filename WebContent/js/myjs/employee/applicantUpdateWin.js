ApplicantUpdateWin = Ext.extend(Ext.Window, {
	id: 'applicantUpdateWinId',
	constructor: function(){
		var applicantForm = new addApplicantForm();
		ApplicantUpdateWin.superclass.constructor.call(this, {
			modal: true,
			width: 825,
			items: [applicantForm]
		});
	}
})