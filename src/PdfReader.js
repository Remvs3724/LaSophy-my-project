import{Layout, Card} from "antd";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import * as pdfjs from "pdfjs-dist"; // Import pdfjs-dist
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "react-router-dom";
const { Content } = Layout;
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const PdfReader=()=>{
    const { pdfPath } = useParams();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const decodedPdfPath = decodeURIComponent(pdfPath);
    const pdfUrl = `http://localhost:5001/PDFdb/${decodedPdfPath}`;
    return (
        <Content
        style={{
          width: "78%",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          padding: "10px",
          background: "#f5f5f5",
        }}
      >
        <Card
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding:"0",
          }}
          
        >
          <div
            style={{
              flex: 1,
              height: "calc(100vh - 100px)", // Keeps the PDF viewer inside the viewport
              overflowY: "auto", 
              padding:"0",// Enables scrolling
            }}
          >
            <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
              <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} defaultScale="PageFit"/>
            </Worker>
          </div>
        </Card>
      </Content>

    )
}
export default PdfReader