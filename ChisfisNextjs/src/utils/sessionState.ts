var sessionState = (function() {

  var user = "";

  var userObject = {
    user_id: '',
    full_name: '',
    first_name : '',
    last_name : '',
    account_type : '',
    avatar : '',
    phone_number : '',
    about : '',
    languages : [],
    created_at : '',
    likes : []
  };

  var init = function() {
    
      let user : string = sessionStorage.getItem('user') ?? '';
      if(user === ''){
        console.log("no user, so calling return");
        return;
      } else {
        let userObj = JSON.parse(user);
        //set all fields to use local storage
        sessionStorage.setItem("userId", userObj.user_id);
        sessionStorage.setItem("firstName", userObj.first_name);
        sessionStorage.setItem("lastName", userObj.last_name);
        sessionStorage.setItem("email", userObj.email);
        sessionStorage.setItem("fullName", userObj.first_name +" "+ userObj.last_name);
        sessionStorage.setItem("accountType", userObj.account_type);
        sessionStorage.setItem("phoneNumber", userObj.phone_number);
        sessionStorage.setItem("avatar", userObj.avatar);
        sessionStorage.setItem("about", userObj.about);
        sessionStorage.setItem("languages", userObj.languages);
        sessionStorage.setItem("created_at", userObj.created_at);
        sessionStorage.setItem("company_name", userObj.company_name);
        
        if(JSON.parse(user).likes) {
          userObj.likes = JSON.parse(user).likes[0];
        }
      }
    };
    
    var updateData = function (id,obj){
      console.log(userObject);
      var id = id;
      userObject[id] = obj;
      sessionStorage.setItem(id, obj);
    }

    var getUserId = function() {
      return sessionStorage.getItem("userId");
    };

    var getFirstName = function() {
      return sessionStorage.getItem("firstName");
    };

    var getEmail = function() {
      return sessionStorage.getItem("email");
    };

    var getFullName = function() {
      return sessionStorage.getItem("fullName");
    };

    var getLastName = function() {
      return sessionStorage.getItem("lastName");
    };

    var getAccountType = function() {
      return sessionStorage.getItem("accountType");
    };

    var getLikes = function() {
     // return sessionStorage.getItem("likes");
     return [];
    };

    var getAvatar = function() {
      return sessionStorage.getItem("avatar");
    };

    var getLanguages = function() {
      const lang = sessionStorage.getItem("languages");
      let parsedLanguages = "";

      if(lang) {
        parsedLanguages = JSON.parse(lang);
      }
      return parsedLanguages;
    };

    var getAbout = function() {
      return sessionStorage.getItem("about");
    };
    
    var getCompanyName = function() {
      return sessionStorage.getItem("company_name");
    };

    var getDateJoined = function() {
      const date = new Date(sessionStorage.getItem("created_at"));
      const year = date.getFullYear();
      const month = date.toLocaleString('us-US', { month: 'long' });
      return month +" "+ year;
    };

    var getPhoneNumber = function() {
      var ph = parseInt(sessionStorage.getItem("phoneNumber"));
      return ph;
    };
  
    return {
      init: init,
      getUserId:getUserId,
      getFirstName: getFirstName,
      getFullName: getFullName,
      getLastName: getLastName,
      getEmail: getEmail,
      getAccountType : getAccountType,
      getLikes : getLikes,
      updateData : updateData,
      getAvatar : getAvatar,
      getPhoneNumber : getPhoneNumber,
      getAbout : getAbout,
      getLanguages : getLanguages,
      getDateJoined : getDateJoined,
      getCompanyName: getCompanyName,
    }
  })();
  
  export default sessionState;