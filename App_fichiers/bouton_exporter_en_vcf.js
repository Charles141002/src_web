import React from "react";

function ExportEnVCF(props){
    const client = props.entite;
  function handleClickExport (client) {
    var vcfContent = "BEGIN:VCARD\n";
    vcfContent += "VERSION:3.0\n";

for (var info in client) {
  if (client.hasOwnProperty(info)) {
    if (client[info]){
    vcfContent += info.toUpperCase() + ":" + client[info] + "\n";
  }
}
}

      
  
    vcfContent += "END:VCARD";
    var blob = new Blob([vcfContent], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);
  
    var link = document.createElement("a");
    link.href = url;
    if (client.Nom && client.Prénom){
        link.download = client.Nom + " " + client.Prénom + ".vcf";
}
    else{link.download = client.Nom + " " + client.Prénom + ".vcf";
}
  
    document.body.appendChild(link);
    link.click();
  
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  
  };

  

    return (
      <div>
        <button className="rounded-button" onClick={() => handleClickExport(client)}>Exporter en VCF</button>
      </div>
    );

}

export default ExportEnVCF;

