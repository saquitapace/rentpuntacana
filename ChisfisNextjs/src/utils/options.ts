import axios from "axios";

const options = (function() {

    const init = async () => {
        const opions = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/auth/options', {
        }).then((response) => {
            console.log("get options:");
            //console.log(response.data[0]);
            
            //setting array to local storage
            localStorage.setItem("options",JSON.stringify(response.data[0]))
            
        }).catch(function (error) {
            console.log("Error getting options");
        });
    }
      
    const optionsSet : string = localStorage.getItem('options') ?? '';
    if (optionsSet === ''){
        init();
    } else {
        console.log("options are already set in localStorage no need to call it again;");
    }

    const getListingTypes = function() {
        const r = JSON.parse(localStorage.getItem("options")).filter(li => li.category == "listing_type");
        return r;
    };
    
    const getRentalLength = function() {
        const r = JSON.parse(localStorage.getItem("options")).filter(li => li.category == "rental_length");
        return r;
    };

    const getGeneralAmenities = function() {
        const r = JSON.parse(localStorage.getItem("options")).filter(li => li.category == "general_amenities");
        return r;
    }

    const getOtherAmenities = function() {
        const r = JSON.parse(localStorage.getItem("options")).filter(li => li.category == "other_amenities");
        return r;
    }

    const getSafeAmenities = function() {
        const r = JSON.parse(localStorage.getItem("options")).filter(li => li.category == "safe_amenities");
        return r;
    }
      
    return {
    getListingTypes : getListingTypes, 
    getRentalLength : getRentalLength,
    getGeneralAmenities : getGeneralAmenities, 
    getOtherAmenities : getOtherAmenities,
    getSafeAmenities : getSafeAmenities,
    }
})();

export default options;