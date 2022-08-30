import { promises as fs } from "fs";

async function main(){
    const salesFiles = await findSalesFiles("stores");
    console.log(salesFiles);
}

async function findSalesFiles(folderName){

    let salesFiles = [];

    async function findFiles(folderName){
        const items = await fs.readdir(folderName, { withFileTypes: true });
        for (let item of items){
            if(item.isDirectory()){
                    await findFiles(`${folderName}/${item.name}`)
            }else{
                if(item.name === "sales.json"){
                    salesFiles.push(`${folderName}/${item.name}`)
                }
            }
        }
    }
    await findFiles(folderName);
    return salesFiles;
}

main();