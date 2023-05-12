import { Text, VStack, View } from 'native-base';
import { Image } from 'native-base';
import { supabase } from '../../../../../utils/supabase';
import 'react-native-url-polyfill/auto'
import { useEffect, useState } from 'react';
export default function Video() {


  const [images, setImages] = useState<any>()
  const [timestamp, setTimestamp] = useState(Date.now());


  useEffect(() => {
    const interval = setInterval(async () => {
      await imageLoading()
    }, 3000);
    return () => clearInterval(interval)
  }, [timestamp]);


  async function imageLoading() {

    const { data, error } = await supabase.storage.from('video').download('./un.jpg') // a changer par le nom du fichier
    if (error) {
      console.log('erreur')
      console.log(error)
    } else {
      console.log("onEstBon")
      const reader = new FileReader();
      reader.readAsDataURL(data);

      reader.onloadend = () => {
        const base64data = reader.result;
        setTimestamp(Date.now())
        console.log(base64data?.slice(0, 100))
        setImages(base64data)

      }

    }

  }

  return (<Image source={{ uri: images }} alt='okokok' w='600' h='300' mb='3' />);

}