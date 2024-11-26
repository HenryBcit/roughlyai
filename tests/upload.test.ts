import { PrepareUploadFile, PromptModel, TrainModel, RetrieveResponse } from '../src';
import dotenv from 'dotenv';

dotenv.config();

test('get upload signed url', async () => {
  const result = await PrepareUploadFile({
    data:[{
      filename:"Test.pdf"
    }, {
      filename:"2item.pdf"
    }],
    dir:"/NPMTest/Jest/",
    api_key:process.env.ROUGHLYAI_API_KEY
  });

  for(let i=0; i<result.length; i++){
    expect(result[i].match(/^http.*/)).toBeTruthy();
  }
});

test('training a model ', async () => {
  const result = await TrainModel({
    dir:"/BCIT/",
    api_key:process.env.ROUGHLYAI_API_KEY
  });

  expect(result).toBeTruthy();
  const _prog:any = await RetrieveResponse(result);
  expect(_prog.progress === 2).toBeTruthy();
}, 60*1000*15);

test('prompting a model ', async () => {
  const result = await PromptModel({
    dir:"/BCIT/",
    api_key:process.env.ROUGHLYAI_API_KEY,
    prompt:"What is this document about?"
  });

  expect(result).toBeTruthy();
  const _prog:any = await RetrieveResponse(result);
  expect(_prog.progress === 2).toBeTruthy();
  expect(typeof _prog.answer === "string").toBeTruthy();
  console.log(_prog);
}, 60*1000*15);