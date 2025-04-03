import { Card, Form ,Input, Upload, message, Button, Checkbox} from "antd"
import { InboxOutlined,FileJpgOutlined} from "@ant-design/icons";
import { useState,useEffect} from "react";
import axios from "axios";
const { Dragger } = Upload;


const UploadContent=()=>{
    const [pdfPath, setPdfPath]=useState('')
    const [imgPath, setImgPath]=useState('')
    const [mapPath, setMapPath]=useState('')
    const [selected, setSelected]=useState('')
    const [mapCoverPath, setMapCoverPath]=useState('')
    const [form] = Form.useForm();

    useEffect(() => {
        const savedFile = localStorage.getItem("uploadedPdf");
        const savedImg=localStorage.getItem("uploadedImg");
        const savedMap=localStorage.getItem('uploadedMap')
        const savedMapcover=localStorage.getItem('uploadedMapcover')
          setPdfPath(savedFile);
          setImgPath(savedImg);
          setMapPath(savedMap);
          setMapCoverPath(savedMapcover)
      }, [pdfPath, imgPath, mapPath, mapCoverPath]);
    const handleUpload= async ()=>{
        const values = await form.validateFields();
        if(!selected){
          message.error("Choose the type of content")
          return;
      } 
        if(selected==="book"){
        if(!pdfPath){
            message.error("Upload the PDF?")
            return;
        }
        if (!imgPath) {
            message.error("Please upload the image.");
            return;
          }
        }
        if(selected==="map"){
        if(!mapPath){
          message.error("Please upload the map.");
          return;

        }
        if(!mapCoverPath){
          message.error("Please upload the map cover");
          return;
        }
      }
        
        try{
        const payload = {
            title: values.title,
            author: values.author,
            year: values.year,
            type: selected,
            ...(selected === "book"
              ? {
                  pdf_path: pdfPath,
                  img_path: imgPath
                }
              : {
                  map_path: mapPath,
                  mapcover_path: mapCoverPath
                })
          };
          console.log('payload',payload)
      const response=await axios.post(`${process.env.REACT_APP_API_URL}/upload/metadata`, payload)
      if(response.data.message==="Upload successful"){
        message.success(response.data.message)
      }
      localStorage.removeItem("uploadedPdf");
      localStorage.removeItem("uploadedImg");
      localStorage.removeItem("uploadedMap");
      localStorage.removeItem('uploadedMapcover')

      setPdfPath("");
      setImgPath("");
      setMapPath("")
      setMapCoverPath("")
      form.resetFields();
      setSelected("");
    } catch(error){
        console.log(error)
    }


    }
    const handleSelected=(type)=>{
        setSelected(prev=>(prev===type ? null : type))
    }
    return (
        <Card title='Upload content' style={{width:"70%"}}>
         <Form form={form} layout="vertical" onFinish={handleUpload}>
            <Form.Item label="Type of contents" name="Type">
            <div style={{ display: 'flex', gap: '12px' }}>
            <Checkbox
            checked={selected==='book'}
            onChange={()=>handleSelected('book')}
            >Book</Checkbox>
            <Checkbox
            checked={selected==='map'}
            onChange={()=>handleSelected('map')}
            >Map</Checkbox>
  </div>
            </Form.Item>
            <Form.Item label="Title" name="title">
                <Input/>
            </Form.Item>
            <Form.Item label="Author" name="author">
                <Input/>
            </Form.Item>
            <Form.Item label=" Publication year" name="year">
                <Input/>
            </Form.Item>
            { selected==="book" ?(
              <>
            
            <Form.Item label="Upload Cover Img" name="img_file">  
     <Dragger
    name="cover"
    multiple={false}
    action={`${process.env.REACT_APP_API_URL}/upload/img`} // <-- your server endpoint
    onChange={(info) => {
      const {status,response} = info.file;

      if (status === "done") {
        const imgname = info.file.name;
        message.success(`${info.file.name} uploaded successfully`);
        setImgPath(info.file.name)
        localStorage.setItem("uploadedImg", imgname);
      } else if (status === "error") {
        if (response?.message === "Img already exists") {
            message.error("This img already exists!");
          } else{
        message.error(`${info.file.name} upload failed`);
          }
      }
    }}
    beforeUpload={(file) => {
        const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      if (!isImage) {
        message.error("Only JPG/PNG/WEBP images are allowed!");
      }
      return isImage || Upload.LIST_IGNORE;
    }}
  >
    <p className="ant-upload-drag-icon">
    <FileJpgOutlined />
    </p>
    <p className="ant-upload-text">Click or drag img to upload</p>
    <p className="ant-upload-hint">Supports only single img upload</p>
  </Dragger>
      </Form.Item>
<Form.Item label="Upload PDF File" name="pdf_file">
<Dragger
    name="file"
    multiple={false}
    action={`${process.env.REACT_APP_API_URL}/upload/pdf`} // <-- your server endpoint
    onChange={(info) => {
        console.log(info.file)
      const {status,response} = info.file;

      if (status === "done") {
        const filename = info.file.name;
        message.success(`${info.file.name} uploaded successfully`);
        setPdfPath(info.file.name)
        localStorage.setItem("uploadedPdf", filename);
      } else if (status === "error") {
        if (response?.message === "Book already exists") {
            message.error("This book already exists!");
          } else{
        message.error(`${info.file.name} upload failed`);
          }
      }
    }}
    beforeUpload={(file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error("Only PDF files are allowed!");
      }
      return isPDF || Upload.LIST_IGNORE;
    }}
  >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag PDF to upload</p>
    <p className="ant-upload-hint">Supports only single PDF upload</p>
  </Dragger>

      </Form.Item>
      </>
               ): (
      <>
      <Form.Item label="Upload maps" name="map_file">  
     <Dragger
    name="map"
    multiple={false}
    action={`${process.env.REACT_APP_API_URL}/upload/map`} 
    onChange={(info) => {
      const {status,response} = info.file;

      if (status === "done") {
        const mapname = info.file.name;
        message.success(`${info.file.name} uploaded successfully`);
        setMapPath(info.file.name)
        localStorage.setItem("uploadedMap", mapname);
      } else if (status === "error") {
        if (response?.message === "Map already exists") {
            message.error("This Map already exists!");
          } else{
        message.error(`${info.file.name} upload failed`);
          }
      }
    }}
    beforeUpload={(file) => {
        const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      if (!isImage) {
        message.error("Only JPG/PNG/WEBP images are allowed!");
      }
      return isImage || Upload.LIST_IGNORE;
    }}
  >
    <p className="ant-upload-drag-icon">
    <FileJpgOutlined />
    </p>
    <p className="ant-upload-text">Click or drag img to upload</p>
    <p className="ant-upload-hint">Supports only single img upload</p>
  </Dragger>
      </Form.Item>

      <Form.Item label="Upload maps cover" name="mapCover_file">  
     <Dragger
    name="map_cover"
    multiple={false}
    action={`${process.env.REACT_APP_API_URL}/upload/map_cover`}
    onChange={(info) => {
      const {status,response} = info.file;

      if (status === "done") {
        const mapcovername = info.file.name;
        message.success(`${info.file.name} uploaded successfully`);
        setMapCoverPath(info.file.name)
        localStorage.setItem("uploadedMapcover", mapcovername);
      } else if (status === "error") {
        if (response?.message === "Map cover already exists") {
            message.error("This Map cover already exists!");
          } else{
        message.error(`${info.file.name} cover upload failed`);
          }
      }
    }}
    beforeUpload={(file) => {
        const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      if (!isImage) {
        message.error("Only JPG/PNG/WEBP images are allowed!");
      }
      return isImage || Upload.LIST_IGNORE;
    }}
  >
    <p className="ant-upload-drag-icon">
    <FileJpgOutlined />
    </p>
    <p className="ant-upload-text">Click or drag img to upload</p>
    <p className="ant-upload-hint">Supports only single img upload</p>
  </Dragger>
      </Form.Item>

      </>
                  )}
        <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit 
            </Button>
          </Form.Item>
            
         </Form>
        </Card>
    )

}
export default UploadContent