import { Layout, Card, message} from "antd";
import { useState, useEffect, useContext} from "react";
import { UserContext } from "./Context/useContext";
import PdfReader from "./PdfReader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import InteractiveInfo from "./BookInteractiveInfo";
const { Content } = Layout;


// Set correct worker source
const ReaderComments = () => {
  const {setUserBookCollects, }=useContext(UserContext);
    const { pdfPath } = useParams();
    const decodedPdfPath = decodeURIComponent(pdfPath);
    const [bookInfo, setInfo]=useState({})
    const [comments, setComments] = useState(" ");
    const [currentUser, setCurrentuser]=useState('')
    const [likeSituation,setlikeSituation]=useState(false)
    const [countLikes, setCountLikes]=useState(0)
    const [collectSituation,setcollectSituation]=useState(false)
    const [countCollects, setCountCollects]=useState(0)
    

    useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/PDFreader/${decodedPdfPath}`,{ withCredentials: true })//don't fogert the withcredential
    .then(response=>{
        if(!response.data.book || response.data.message){
            message.error(response.data.message)
        }else{
          console.log('bookcomments', response.data.totalLikes)
            setInfo(response.data.book)
            setComments(response.data.comments || [])
            setCurrentuser(response.data.currentUser)
            setlikeSituation(response.data.like_or_not)
            setCountLikes(response.data.totalLikes)
            setcollectSituation(response.data.collect_or_not)
            setCountCollects(response.data.totalCollects)
            setUserBookCollects(response.data.book_collects)
        }
    }).catch(error => {
        message.error("Error fetching book info", 1);
    });
    
  },[])
  return (
    <Layout style={{ height: "100vh", display: "flex", flexDirection: "row", overflow: "hidden" }}>
      {/* Left Side: Comments Section */}
      <Content
        style={{
          width: "40%",
          background: "white",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Card
        style={{
            height:"30%",
            overflowY: "auto",
            boxShadow: "none",
            border: "none",
            borderRadius: "0"

        }}
        >
           <h1>{bookInfo.title}</h1> 
           <h2>{bookInfo.author}</h2>
           <h3>{bookInfo.year}</h3>
        </Card>
        <InteractiveInfo bookInfo={bookInfo} setInfo={setInfo} comments={comments} likeSituation={likeSituation} countLikes={countLikes} collectSituation={collectSituation} countCollects={countCollects}/>
        <Comments bookInfo={bookInfo} comments={comments} currentuser={currentUser} setComments={setComments} />
      </Content>
      <PdfReader/>
    </Layout>
  );
};

export default ReaderComments;