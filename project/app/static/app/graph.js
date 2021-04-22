google.charts.load('current', {'packages':['corechart']})

$( function() {
    $(".nav-graph").addClass("active")
    var from = $( "#fromDate" )
      .datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
      })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) )
        }),
    to = $( "#toDate" ).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
    })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) )
      });
    from.attr("autocomplete","off")
    to.attr("autocomplete","off")

    function getDate( element ) {
      var date;
      var dateFormat = "yy-mm-dd"
      try {
        date = $.datepicker.parseDate( dateFormat, element.value )
      } catch( error ) {
        date = null;
      }
      return date;
    }

    function strDate( element, addDays ) {
      var selectedDate = getDate( element )
      selectedDate.setDate(selectedDate.getDate() + addDays)
      return reprDate( selectedDate )
    };
    function reprDate( selectedDate ){
      var selectedDate= new Date(selectedDate)
      var month = selectedDate.getMonth() + 1
      month = month.toString().padStart(2, '0')
      var day = selectedDate.getDate().toString().padStart(2, '0')
      var year = selectedDate.getFullYear().toString()
      return year+month+day;
    };//20210409
    var toDate = new Date();
    var fromDate = new Date();
    var selectedVars = 11000000000000
    toDate.setDate(toDate.getDate() + 1)
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

    google.charts.setOnLoadCallback(drawChart);
    var columns=["DATETIME","AMB_T","BOILER_T","HEAT_T_CON","HEAT_T_LIM","COOL_FLOW","COOL_T_IN","COOL_T_OUT","CURRENT","VOLTAGE","E_POWER","E_ENERGY","T_POWER","STATUS"]
    columns.shift()
    graphVars = {}

    function formatTitle(title){
      words = title.split("_")
      newTitle = words.map(word => {
        return word.charAt(0) + word.substring(1).toLowerCase()
      });
      newTitle = newTitle.join("_")
      return newTitle
    }
    function addVarSelector(){
      var varCheckboxArray = columns.map(name => {
        return `
          <div class='${name}'>
            <input class="form-check-input" type="checkbox" value="${name}" id="${name}">
            <label class="form-check-label" for="${name}">${formatTitle(name)}</label>
          </div>
        `
      })
      $('#graph-selector').html(varCheckboxArray.join(''))
    }
    addVarSelector()


    function checkInitial() {
      columns.forEach(name => graphVars[name] = false)
      document.getElementById("AMB_T").checked = true
      graphVars["AMB_T"] = true
    }
    checkInitial()

    function drawChart() {
      var options = {
        height: 600,
        legend: { position: 'bottom' }
      }

      var data = new google.visualization.DataTable()

      data.addColumn('datetime', 'Datetime')
      columns.forEach(varName => {
        if(graphVars[varName]==true){
          var newName = formatTitle(varName)
          if( varName.includes("_T")){
              newName=`${newName} [ºC]`
          } else if( varName.includes("POWER")){
              newName=`${newName} [W]`
          } else if ( varName.includes("FLOW")){
              newName=`${newName} [l/min]`
          } else if( varName.includes("CURRENT")){
              newName=`${newName} [A]`
          } else if ( varName.includes("VOLTAGE")){
              newName=`${newName} [V]`
          } else if ( varName.includes("ENERGY")){
              newName=`${newName} [kWh]`
          }
          data.addColumn('number',newName)
        }
      });

      function getFullArray(item) {
        varNames=Object.keys(graphVars)
        var fullArray=[new Date(item.DATETIME)]
        columns.forEach(varName=>{
          if(graphVars[varName]==true){
            if(varName.includes("T_P")){
              fullArray.push(parseFloat(
                Math.max(0,(item["COOL_T_OUT"]-item["COOL_T_IN"])*item["COOL_FLOW"]*4184/60)
              ))
            } else {
            fullArray.push(parseFloat(item[varName]))}
          }
        })
        return fullArray
      }

      function mapData() {
      return tableData.map(getFullArray)
      }

      data.addRows(mapData())
      var chartDiv = document.getElementById('chart_div')
      var chart = new google.visualization.LineChart(chartDiv)
      chart.draw(data, options)
    }
    function setCharAt(str,index,chr) {
      str=str+''
      str = str.split('')
      str[index] = chr
      str = str.join('')
      return str
    }
    function retrieveData(fromDate, toDate){
      endpoint = "/graphAPI/" + selectedVars + '/' + fromDate + '/' + toDate +'/'  ///graphAPI/1010101010101/20210409/20210410
      $.ajax({
        method: "Get",
        url: endpoint,
        success: function(data){
        tableData=data
        try{drawChart()}
        catch{}
        },
        error: function(error_data){
        }
      })
    };

    function selectT_POWER(selected){
      selectedVars = setCharAt(selectedVars, 5, selected)
      selectedVars = setCharAt(selectedVars, 6, selected)
      selectedVars = setCharAt(selectedVars, 7, selected)
      selectedVars = setCharAt(selectedVars, 12, selected)
    }

    $(".form-check-input").change(function() {
      selectedVar = $(this).attr('id')
      if(this.checked) {
        graphVars[selectedVar] = true
        if (selectedVar == "T_POWER"){
          selectT_POWER(1)
        } else {
          selectedVars = setCharAt(selectedVars, columns.indexOf(selectedVar)+1, 1)
        }
        retrieveData(fromDate, toDate)
      }
      else{
        graphVars[selectedVar] = false
        if (selectedVar == "T_POWER"){
          selectT_POWER(0)
          if(graphVars["COOL_FLOW"]){
            selectedVars = setCharAt(selectedVars, 5, 1)
          }
          if(graphVars["COOL_T_IN"]){
            selectedVars = setCharAt(selectedVars, 6, 1)
          }
          if(graphVars["COOL_T_OUT"]){
            selectedVars = setCharAt(selectedVars, 7, 1)
          }
        } else {
          selectedVars = setCharAt(selectedVars, columns.indexOf(selectedVar)+1, 0)
          if(graphVars["T_POWER"]){
            selectT_POWER(1)
          }
        }
        retrieveData(fromDate, toDate)
      }
    })
    retrieveData(fromDate, toDate)
})