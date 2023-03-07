import axios from "axios";
import { useAppContext } from '../Context/AppContext';

export const generateImage = (text ) => {
// const { loading, setLoading } = useAppContext();
  try {
    // setLoading(true);
    console.log(text)
    axios({
      method: 'POST',
      url: `https://dalle360-2-6k6gsdlfoa-el.a.run.app/generate-image`,
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
      data: {text: text},
    })
      // axios.post("https://dalle360-2-6k6gsdlfoa-el.a.run.app/generate-image", {text: text}, {
      //   headers: {
      //       'Content-Type': 'application/json;charset=UTF-8',
      //       "withCredentials": false,
      //   }
      // })
      .then((response) => {
        console.log(response.json());
        return 
      });
  } catch (err) {
    // setLoading(false)
    console.log(err);
    alert(err)
  }
};
