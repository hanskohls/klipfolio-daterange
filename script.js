require(["https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"],
    function (ok) {

        var maxDate = new Date();

        var picker = new Litepicker({
            element: document.getElementById('drp'),
            format: 'DD MMM YYYY',
            firstDay: 0,
            numberOfMonths: 2,
            minDays: 1,
            maxDays: 93,
            maxDate: maxDate,
            singleMode: false,
            selectForward: true,
            setup: function (picker) {
		let initial_to = new Date(dashboard.getDashboardProp('var_to', 3) * 1000);
		let initial_from = new Date(dashboard.getDashboardProp('var_from', 3) * 1000);

		picker.setDateRange(initial_to.getTime() + (initial_to.getTimezoneOffset()*60), initial_from.getTime() + (initial_from.getTimezoneOffset()*60));

                picker.on('show', function () {
                    let date = picker.DateTime();
                    if (date) {
                        date.setMonth(date.getMonth() - 1);
                        picker.gotoDate(date);
                    }
                });

                picker.on('selected', function (date1, date2) {	// These date parameters are not Javascript Date Objects
		    date1 = date1.toJSDate();
		    date2 = date2.toJSDate();

                    let ep1 = date1.getTime() / 1000;
                    let ep2 = date2.getTime() / 1000;

		    ep1 -= date1.getTimezoneOffset() * 60;
		    ep2 -= date2.getTimezoneOffset() * 60;

                    dashboard.setDashboardProp(3, 'var_from', ep1.toString(), dashboard.activeTab.id);
                    dashboard.setDashboardProp(3, 'var_to', ep2.toString(), dashboard.activeTab.id);
                    dashboard.setDashboardProp(2, 'var_from', ep1.toString(), dashboard.activeTab.id);
                    dashboard.setDashboardProp(2, 'var_to', ep2.toString(), dashboard.activeTab.id);
                    console.log(ep1, ep2);
                    dashboard.onKlipStatesChanged('', {
                        klips: [dashboard.activeTab.id],
                        state: {}
                    });
                });
            },
        });
    })
