import React from "react";
import ImageGallery from "./ImageGallery";
import PopUpClaim from "../NewClaim/PopUpClaim";


function Reports(){
    return(
        <div className="max-w-4xl mx-auto p-8">
        <h1>Reports</h1>
        
        <ImageGallery folderName="544" />
        </div>
    );
}export default Reports