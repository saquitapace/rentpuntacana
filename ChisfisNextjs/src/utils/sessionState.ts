var sessionState = (function() {

  var user = ""; 

  var userObject = {
    user_id: '',
    full_name: '',
    first_name : '',
    last_name : '',
    account_type : '',
    likes : []
  };

  var init = function() {
      let user : string = sessionStorage.getItem('user') ?? '';

      if(user === '' ){
        console.log("no user");
        console.log("return");
        return;
      } else {
        console.log("initializing sessionStorage");
        userObject.user_id = JSON.parse(user).user_id; // initialize empty object
        userObject.full_name = JSON.parse(user).first_name + " " + JSON.parse(user).last_name;
        userObject.first_name = JSON.parse(user).first_name; // initialize empty object
        userObject.last_name = JSON.parse(user).first_name;
        userObject.account_type = JSON.parse(user).account_type;
        console.log(userObject);
      }
    };
    
    var getUserId = function() {
      return userObject.user_id;
    };

    var getFirstName = function() {
      return userObject.first_name;
    };

    var getFullName = function() {
      return userObject.full_name;
    };

    var getLastName = function() {
      return userObject.last_name;
    };

    var getAccountType = function() {
      return userObject.account_type;
    };
  
    return {
      init: init,
      getUserId:getUserId,
      getFirstName: getFirstName,
      getFullName: getFullName,
      getLastName: getLastName,
      getAccountType:getAccountType
    }
  })();
  
  export default sessionState;