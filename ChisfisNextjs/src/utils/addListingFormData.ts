import axios from "axios";

const addListingFormData = (function() {

   // default list object
   const listing = {
        id : "",
        listingId : "",
        userId : "",
        href : "",
        address : "",
        title : "",
        description : "",
        bedrooms : "",
        bathrooms : "",
        tags : "",
        map : {lat:"", lng:""} ,
        availablity_date : "",
        status : "draft",
        smoking : 0,
        pets : 0,
        kitchen:"",
        listing_type: "",
        about: "",
        square_meters :"",
        general_amenities :"",
        other_amenities :"",
        safe_amenities : ""
    }
    
    const init = async () => {

    }

    // TABLES
    // listings
    // pricing
    // 1_month, 3_months, 6_months, 1_year, deposit
    
    // listings: 
   /* const init = async () => {
        const opions = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/auth/i18n', {
        }).then((response) => {
            //console.log("get i18n:");
            //console.log(response.data[0]);
            
            //setting array to session storage
            sessionStorage.setItem("i18n",JSON.stringify(response.data[0]))
            
        }).catch(function (error) {
            console.log("Error getting i18n");
        });
    }
    */

    const addListingFormData : string = sessionStorage.getItem('i18n') ?? '';
    if (addListingFormData === ''){
        init();
    } else {
        console.log("addListingFormData are set in sessionStorage so no need to call it again;");
        return;
    }
      
    return {

    }
})();

export default addListingFormData;