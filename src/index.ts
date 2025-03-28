// import { ExtractUrl } from "./extract";

const root = "https://api.roughlyai.com/ttfiles";
// const root = "http://localhost:3001";
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

interface FileTypes {
  url?: string,
  filename: string,
  // file?: File,
  filedata?: string
}

function CheckServerSide(){
  if(typeof window !== "undefined"){
    throw new Error("This function must be called serverside");
    // return false;
  }

  return true;
};
export async function PrepareUploadFile({
  data = [],
  dir = null,
  api_key = null
}: { data: FileTypes[], dir: string | null, api_key?: string | null }){
  CheckServerSide();
  try {
    const _resp = await fetch(`${root}/api/prompt_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handler: "prepare_upload",
        key: dir,
        files: data,
        api_key: api_key || process.env.ROUGHLYAI_API_KEY
      })
    })
    const { data: _url, status } = await _resp.json();
    console.log("what is url?", _url);
    if(status){
      return _url;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export async function TrainModel({
  dir = null,
  api_key = null
}:{dir: string | null, api_key?: string | null }){
  try {
    
    const _resp = await fetch(`${root}/api/prompt_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handler: "api_train",
        key: dir,
        api_key: api_key || process.env.ROUGHLYAI_API_KEY
      })
    })
    const { data: _url, status } = await _resp.json();
    if(status){
      return _url;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function UploadUrl({
  data = [],
  dir = null,
  api_key = null
}: { data: FileTypes[], dir: string | null, api_key?: string | null }) {

  if(typeof window !== "undefined"){
    throw new Error("This function must be called serverside");
    // return false;
  }
  try {
    // const _upload_data = await ExtractUrl(data.url)
    const _resp = await fetch(`${root}/api/prompt_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handler: "api_upload_url",
        key: dir,
        upload_data: data,
        api_key: api_key || process.env.ROUGHLYAI_API_KEY
      })
    })
    const { data: _url, status } = await _resp.json();
    if(status){
      return _url;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
  // return "Something went wrong";
}

export async function PromptModel({
  prompt=null,
  dir = null,
  api_key = null
}: { prompt: string | null, dir: string | null, api_key?: string | null }) {

  if(typeof window !== "undefined"){
    throw new Error("This function must be called serverside");
    // return false;
  }
  try {
    const _resp = await fetch(`${root}/api/prompt_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handler: "api_call",
        key: dir,
        api_key: api_key || process.env.ROUGHLYAI_API_KEY,
        question:prompt,
        numsimular:30
      })
    });
    const {data:_url, status} = await _resp.json();
    if(status){
      return _url;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
  // return "Something went wrong";
}

export async function RetrieveResponse(_url: string) {
  // if(typeof window === "undefined"){
  //   throw new Error("Should be calling this on the client side");
  // }
  try {
    const _response = await new Promise((resolve) => {
      const GetProgress = async (tries = 0) => {
        if (tries >= 50) {
          console.log("too long");
          resolve(false)
        }
        const _progress = await fetch(_url);
        const _progJson = await _progress.json();
        console.log("progress in json", _progJson);
        if (_progJson.progress === 2) {
          resolve(_progJson)
        } else {
          //try again
          await setTimeout(() => GetProgress(tries + 1), 2000)
        }
      }
      GetProgress();
    });

    return _response;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function DeleteModelFiles(
  {api_key, dir, filenames}:
  {api_key:string, dir: string, filenames:string | string[]}) {
  // if(typeof window === "undefined"){
  //   throw new Error("Should be calling this on the client side");
  // }
  if(typeof window !== "undefined"){
    throw new Error("This function must be called serverside");
    // return false;
  }
  try {
    const _resp = await fetch(`${root}/api/prompt_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handler: "api_delete_files",
        key: dir,
        api_key: api_key || process.env.ROUGHLYAI_API_KEY,
        files:filenames
      })
    });
    const {msg:_msg, status} = await _resp.json();
    if(status){
      return _msg;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function ListModelFiles({api_key, dir}:
  {api_key:string, dir: string}){
  if(typeof window !== "undefined"){
    throw new Error("This function must be called serverside");
    // return false;
  }
  try {
    const _resp = await fetch(`${root}/api/prompt_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handler: "api_list_keys",
        key: dir,
        api_key: api_key || process.env.ROUGHLYAI_API_KEY
      })
    });
    const {data:_data, status} = await _resp.json();
    if(status){
      return _data;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}