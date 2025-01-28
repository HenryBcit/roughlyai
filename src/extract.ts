// import { JSDOM } from 'jsdom';

// // var http = require('http');



// export async function ExtractUrl(url:string) {
//   let json: any = {};
//   try {
//     // const { searchParams } = new URL(req.url);

//     const _fetchurl = url.startsWith("http") ? url : `https://${url}`;
//     const _resp = await fetch(_fetchurl);
//     // console.log("resp", _resp.status);
//     let _text = await _resp.text();
//     const dom = new JSDOM(_text);


//     // console.log("text", _text);
//     // console.log("text", dom?.window?.document?.querySelector("body")?.textContent);
//     const _links: string[] = []
//     console.log("root domain", _fetchurl.replace(/(http[s]?:\/\/[a-zA-Z0-9\.\-\_]+)\/(.+)/, '$1'), _fetchurl);
//     // if(dom?.window?.location){
//     // }
//     dom?.window?.document?.querySelectorAll("a")?.forEach(el => {
//       let _href: string | null = null;

//       if (el.href?.startsWith("http")) {
//         _href = el.href;
//       }

//       if (el.href?.startsWith("/")) {
//         _href = `${_fetchurl.replace(/(http[s]?:\/\/[a-zA-Z0-9\.\-\_]+)\/(.+)/, '$1')}${el.href}`
//       }

//       if (typeof _href === 'string' && !_links.includes(_href)) {
//         _links.push(_href);
//       }
//     });
//     console.log();
    
//     dom?.window?.document?.querySelectorAll("body script")?.forEach(el => {
//       el.textContent = "";
//     });
//     dom?.window?.document?.querySelectorAll("body style")?.forEach(el => {
//       el.textContent = "";
//     });
    

//     const _title = dom?.window?.document?.querySelector("title")?.textContent || ''
//     const _body = dom?.window?.document?.querySelector("body")?.textContent || '';
//     json = { extract: _body, links: _links, title: _title };

//   } catch (e: any) {
//     //no body
//     console.log("no body error", e.message)
//   }

//   return json
// }