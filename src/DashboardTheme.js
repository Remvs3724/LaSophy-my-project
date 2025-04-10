import { Card } from "antd";
import { useNavigate} from "react-router-dom";
const DashboardTheme=()=>{
  const navigate=useNavigate()
    return(
      <>
      <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    padding: "1rem",
  }}>
      <Card 
      hoverable
      style={{ height:500}}
      cover={
        <img
        alt=""
        src={`https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/themeCover/themebook.png`}
        style={{ height: "400px", objectFit: "cover" }} 
        />

      }
       onClick={()=>navigate('/books')}>

        <div style={{fontSize: "18px",
                     fontWeight: "bold",
                     //wordWrap: "break-word",
                     textAlign: "center",
                     maxWidth: "100%",
                     lineHeight: "1.4",}} >Transitions and rebellion, collapse and resurgence </div>
       
      </Card>

      <Card 
      hoverable
      style={{ height:500}}
      cover={
        <img
        alt=""
        src={`https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/themeCover/thememap.png`}
        style={{ height: "400px", objectFit: "cover" }} 
        />
      }

       onClick={()=>navigate('/maps')}>

        <div style={{fontSize:"20px", fontWeight:"bold",minWidth: "300px"}}>16-18th Maps</div>

      </Card>
      </div>
      </>
    )

}
export default DashboardTheme