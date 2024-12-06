import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Input from '../components/Input';
import { generateEmojiFromText } from '../utils/api/emoji';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';

function Home() {
  const [emojiTranslated, setEmojiTranslated] = React.useState('');
  const [textToTranslate, setTextToTranslate] = React.useState('');
  const [loadingTranslate, setLoadingTranslate] = React.useState(false);
  async function translate() {
    setLoadingTranslate(true);
    try {
      const res = await generateEmojiFromText({ text: textToTranslate });
      console.log({ res });

      setEmojiTranslated(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTranslate(false);
    }
  }
  return (
    <DefaultLayout wrapperClassName='items-center'>
      <Card className='w-[90%] md:w-[50%] p-3  flex flex-col items-center'>
        <CardHeader>
          <h1 className='text-center text-xl'>🔠🔡🔤</h1>
        </CardHeader>
        <div className='p-3 md:p-10  flex flex-col items-center w-full gap-y-2'>
          <Input
            type='text'
            placeholder='💬'
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
          />
          {loadingTranslate && <p className=' rotateAnim'>🔃</p>}
          {emojiTranslated && <p>{emojiTranslated}</p>}
          <Button className='w-full' onClick={() => translate()}>
            ▶️
          </Button>
        </div>
      </Card>
    </DefaultLayout>
  );
}

export default Home;
