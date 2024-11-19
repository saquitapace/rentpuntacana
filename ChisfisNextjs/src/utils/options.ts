import axios from "axios";

const options = (function() {
    const init = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/auth/options');
            if (response.data && response.data[0]) {
                localStorage.setItem("options", JSON.stringify(response.data[0]));
            }
        } catch (error) {
            console.error("Error getting options:", error);
        }
    };

    // Helper function to safely parse localStorage data
    const safeGetOptions = () => {
        if (typeof window === 'undefined') return null;
        
        try {
            const options = localStorage.getItem("options");
            return options ? JSON.parse(options) : null;
        } catch (error) {
            console.error("Error parsing options:", error);
            return null;
        }
    };

    // Initialize if needed
    if (typeof window !== 'undefined') {
        const optionsSet = localStorage.getItem('options');
        if (!optionsSet) {
            init();
        }
    }

    const getListingTypes = function() {
        const options = safeGetOptions();
        return options?.filter(li => li.category === "listing_type") || [];
    };
    
    const getRentalLength = function() {
        const options = safeGetOptions();
        return options?.filter(li => li.category === "rental_length") || [];
    };

    const getGeneralAmenities = function() {
        const options = safeGetOptions();
        return options?.filter(li => li.category === "general_amenities") || [];
    };

    const getOtherAmenities = function() {
        const options = safeGetOptions();
        return options?.filter(li => li.category === "other_amenities") || [];
    };

    const getSafeAmenities = function() {
        const options = safeGetOptions();
        return options?.filter(li => li.category === "safe_amenities") || [];
    };
      
    return {
        getListingTypes,
        getRentalLength,
        getGeneralAmenities,
        getOtherAmenities,
        getSafeAmenities,
    };
})();

export default options;