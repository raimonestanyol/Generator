$( function() {
    $(".nav-table").addClass("active")
    var from = $( "#fromDate" )
      .datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
      })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
    to = $( "#toDate" ).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
    })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
    from.attr("autocomplete","off")
    to.attr("autocomplete","off")

    function getDate( element ) {
      var date;
      var dateFormat = "yy-mm-dd";
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
      return date;
    }

    function strDate( element, addDays ) {
      var selectedDate = getDate( element )
      selectedDate.setDate(selectedDate.getDate() + addDays);
      return reprDate( selectedDate )
    };

    function reprDate( selectedDate ){
      var selectedDate= new Date(selectedDate)
      var month = selectedDate.getMonth() + 1
      month = month.toString().padStart(2, '0')
      var day = selectedDate.getDate().toString().padStart(2, '0')
      var year = selectedDate.getFullYear().toString()
      return year+month+day;
    };

    var toDate = new Date();
    var fromDate = new Date();
    toDate.setDate(toDate.getDate() + 1);
    fromDate = reprDate(fromDate)
    toDate = reprDate(toDate);

    $("#fromDate").change(function() {
      fromDate = strDate(this, 0)
      retrieveData(fromDate,toDate)
    });
    $("#toDate").change(function() {
      toDate = strDate(this, 1)
      retrieveData(fromDate,toDate)
    });


    var table = new Tabulator("#table", {
      layout:"fitColumns",
      responsiveLayout:"hide",
      tooltips:true,
      pagination:"local",
      paginationSize:20,
      movableColumns:true,
      resizableRows:true,
      initialSort:[
        {column:"DATETIME", dir:"asc"},
      ],
      columns:[
        {title:"DATETIME", field:"DATETIME", headerFilter:"input"},
        {title:"AMB_T", field:"AMB_T", headerFilter:"input"},
        {title:"BOILER_T", field:"BOILER_T", headerFilter:"input"},
        {title:"HEAT_T_CON", field:"HEAT_T_CON", headerFilter:"input"},
        {title:"HEAT_T_LIM", field:"HEAT_T_LIM", headerFilter:"input"},
        {title:"COOL_FLOW", field:"COOL_FLOW", headerFilter:"input"},
        {title:"COOL_T_IN", field:"COOL_T_IN", headerFilter:"input"},
        {title:"COOL_T_OUT", field:"COOL_T_OUT", headerFilter:"input"},
        {title:"CURRENT", field:"CURRENT", headerFilter:"input"},
        {title:"VOLTAGE", field:"VOLTAGE", headerFilter:"input"},
        {title:"E_POWER", field:"E_POWER", headerFilter:"input"},
        {title:"E_ENERGY", field:"E_ENERGY", headerFilter:"input"},
        {title:"STATUS", field:"STATUS", headerFilter:"input"},
      ],
    })


    document.getElementById("download-csv").addEventListener("click", function(){
      table.download("csv", "data.csv");
    });

    function retrieveData(fromDate, toDate){
      endpoint = '/tableAPI/' + fromDate + '/' + toDate +'/'
      table.setData(endpoint);
    }

    retrieveData(fromDate, toDate)
})