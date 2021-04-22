$( function() {
    $(".nav-home").addClass("active")
    function retrieveData(){
      endpoint = "/realTimeAPI/"
      $.ajax({
        method: "Get",
        url: endpoint,
        success: function(data){
        printVar(data)
        },
        error: function(error_data){
        }
      })
    };

    function printVar(data){
      var T_POWER = Math.max(0, parseInt(( data.COOL_T_OUT - data.COOL_T_IN ) * data.COOL_FLOW * 4184 / 60))
      var date = new Date(data.DATETIME)
      hours = date.getHours()
      minutes = date.getMinutes()
      day = date.getDate()
      month = date.getMonth()
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      var content = `<p class='text-justify mb-0 mx-3 mx-xl-5'>${months[month]} ${day}, ${hours}:${minutes} The total electric energy generated so far is ${data.E_ENERGY} kwh. The electric power generated now is ${data.E_POWER} W and thermal power ${T_POWER} W.</p>`
      $('#real-time-vars').html(content)
    }

    retrieveData()
  })