/* eslint-disable no-console */
import { useRef, useState } from 'react';

import { Head } from '@/components';
import { MainLayout } from '@/layouts';

export default function HomePage() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleExtract = async () => {
    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n${textRef?.current?.value}`,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      }),
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_OPENAI_API_URL as string,
        options
      );
      const json = await response.json();
      console.log(json.choices[0].text.trim());
      setKeywords(json.choices[0].text.trim());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head />
      <MainLayout>
        <section className="p-8 flex flex-col h-full justify-center text-center">
          <p className="text-2xl font-bold">
            Paste your text bellow, we will extract your keyword
          </p>
          {/* text area */}
          <div className="flex flex-col items-center justify-center mt-8">
            <textarea
              className="h-32 p-4 border border-gray-300 rounded-md max-w-screen-sm w-full resize-none bg-slate-800 border-none text-white  :focus:border-transparent"
              placeholder="Paste your text here"
              ref={textRef}
            />
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md "
              onClick={handleExtract}
            >
              Extract
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-1xl">Your keyword</p>
            {loading ? (
              <p className="text-1xl">Loading...</p>
            ) : (
              <p className="text-1xl">{`${keywords} `}</p>
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
}
