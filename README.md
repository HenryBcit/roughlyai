# RoughlyAI

RoughlyAI is a file management platform that an organization can use for their own Artificial Intelligence training. We use a combination of llama-index and AWS lambda and S3 as our core stack. Provided here are simple functions for developers to prompt their own data models.

<!-- ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/HenryBcit/roughlyai/test.js.yml?branch=main)b -->

To use the API, first sign up for an account at https://beta.roughlyai.com and enable the api key under "The Vault"

# QUICK START

To get started, create a model on the platform, upload the documents that you want as your model and train it. Make sure you copy your API_KEY.

![using roughly ai](https://github.com/HenryBcit/roughlyai/raw/main/src/images/vaultaddimg.png "RoughlyAI Vault")

On your own application you can prompt your model. How this system works is it will put your prompt into the queue and the server will provide you with a signed url. This url will have your prompted result when it's done. This same procedure will be used for all other functionalities of the API.

## Serverside

Make sure you are doing this on the serverside

```typescript
import { PromptModel } from "roughlyai";

async function TestPrompt() {
  try {

    //dir is the model name you made in the platform
    const _url = await PromptModel({
      prompt: "Tell me a few interesting facts about the documents?",
      api_key: process.env.ROUGHLYAI_API_KEY,
      dir: "/RoughlyAPITest/",
    });

    //a url will be returned, this url have the results once the prompt is finished in the background
    return _url;
  } catch (e) {
    console.log("error", e.message);
  }
}
```

The response is a signed url string

```string
https://techies-filing.s3.ca-central-1.amazonaws.com...
```

Then afterwards on the client side or server side, use RetrieveResponse

```typescript
const _json = await RetrieveResponse(_url);
```

The json that returns will be

```json
{
  "progress": 2, //2 means the prompt has completed
  "question": "Tell me a few interesting facts about the documents?",
  "answer": "The AI response...",
  "documents": [ 
    //references from the trained documents
  ]
}
```

## Full code example

### server.ts
```typescript
///server side server.ts
import { PromptModel, RetrieveResponse } from "roughlyai";

async function handler(req:Request, resp:Response){
  try {
    const _url:string = await PromptModel({
      prompt: "Tell me a few interesting facts about the documents?",
      api_key: process.env.ROUGHLYAI_API_KEY,
      dir: "/RoughlyAPITest/",
    });

    //this part can be done in either server side or client side

    //if you plan to do this on the client side then just return the url to the client side
    //return Response.json(_url);

    const _json:any = await RetrieveResponse(_url);
    return resp.json(_json);
  } catch (e:any) {
    console.log("error", e.message);
  }
}
```

### client.tsx
```tsx
///client side using react
import { RetrieveResponse } from "roughlyai";
import { useState } from "react";

function CustomComp(){

  const [res, setRes] = useState<string>("");
  const DoPrompt = async ()=>{
    const _resp = await fetch("https://url/to/server");
    const _url = await _resp.json();

    const _json = await RetrieveResponse(_url);
    setRes(JSON.stringify(_json));
  }

  return (
    <div>
      <button onClick={()=>DoPrompt()}>{`Test Prompt`}</button>
      <div style={{whitespace:"pre-wrap"}}>Results: {res}</div>
    </div>
  )
}
```


