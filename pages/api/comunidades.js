import { SiteClient } from 'datocms-client'

export default async function comunidades(req, res) {

  if(req.method === 'POST') {
    const TOKEN = '8173f256555b0053d3ca6be9ba9f20';
    const client = new SiteClient(TOKEN);
  
   const newRegister = await client.items.create({
      itemType: "968441", //ID do Model de "Communities" criado pelo Dato CMS
      ...req.body,
      // title: "Comunidade de Teste",
      // imageUrl: "https://github.com/carlos-evieira.png" ,
      // creatorSlug: "carlos-evieira"
    })
  
    console.log(newRegister)
    
    res.json({
      dados: "Algum dado qualquer",
      novoRegistro:  newRegister,
    })
    return;
  }
  res.status(404).json({
    message: "ainda não temos nada no GET, mas no POST tem!"
  })
}
