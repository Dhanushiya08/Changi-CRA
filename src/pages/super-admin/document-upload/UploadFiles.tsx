import { Button, Upload, message } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { LOCAL_IMAGE } from "../../../assets/images/ImagesJson";
import { getUserCookie } from "../../../utils/helperFunctions/getCookie";
import { useFileListRefetch } from "../../../zustand/useFileListRefetch";
import AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
  signatureVersion: process.env.REACT_APP_AWS_SIGNATURE_VERSION,
});
const s3 = new AWS.S3();
interface UploadFilesProps {
  handleCancel: () => void;
}
const UploadFiles: React.FC<UploadFilesProps> = ({ handleCancel }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];
  const refetchFileList = useFileListRefetch(
    (state: any) => state.setFileListDataRefetch
  );

  const syncFile = (fileName: any) => {
    const formData = new FormData();
    const authHeader = {
      "x-api-key": "AkJvsluxONUTQ6HHGwm5aeI4nBoc5hQbzz80Ho10",
      Authorization: getUserCookie()?.jwt_token || "",
    };
    const url = `https://6sc9zcwrf3.execute-api.ap-south-1.amazonaws.com/uploadtest/upload?event_type=start-ingestion-job&file_name=${fileName.replace(
      /\s/g,
      ""
    )}&uploaded_by=${getUserCookie()?.email_id}`;

    axios
      .post(url, formData, {
        headers: authHeader,
      })
      .then((res: any) => {
        if (res.data.statusCode == 200) {
          message.success("Sync Success!");
        } else {
          message.error(res.data.message);
        }
        refetchFileList();
      })
      .catch(() => {
        message.error(" failed");
        refetchFileList();
      })
      .finally(() => {});
  };

  const handleUpload = async () => {
    setUploading(true);
    let selectedFile = fileList[0];
    // const S3_BUCKET = "changi-upload-file";
    const S3_BUCKET = "changi-test";

    // Prepare upload parameters
    const params = {
      Bucket: S3_BUCKET,
      Key: selectedFile.name.replace(/\s/g, ""),
      Body: selectedFile,
    };

    try {
      // Upload the file to S3
      const data = await s3.upload(params).promise();
      syncFile(selectedFile.name);
      console.log("File uploaded successfully:", data.Location);
      setFileList([]);
      message.success("Upload successful");
      setUploading(false);
      handleCancel();
      setTimeout(() => {
        refetchFileList();
      }, 3000);

      // Add your success handling logic here
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      // Add your error handling logic here
    }
  };

  const props = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file: any) => {
      const incomingFileSize = file.size;
      const fileSizeInBytes = incomingFileSize;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      const maxSizeMB = 5;

      if (fileSizeInMB > maxSizeMB) {
        message.error(
          "File size exceeds 5 MB. Please upload a file with size less than 5 MB."
        );
        return false;
      }
      if (!allowedFileTypes.includes(file.type)) {
        message.error("You can only upload DOC or PDF files!");
        return false;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    accept: ".doc,.docx,.pdf,.xlsx,.csv", // Accept only .doc, .docx, and .pdf files
    multiple: false, // Disable multiple file uploads
  };
  const triggerUploadRef = useRef<HTMLInputElement>(null);
  const onTriggerUpload = () => {
    triggerUploadRef.current?.click();
  };

  return (
    <>
      <div
        onClick={onTriggerUpload}
        className="bg-[#f4f4f4] flex justify-center py-8 w-[100%]"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <img src={LOCAL_IMAGE.uploadIcon} alt="Upload icon" />
          </div>
          <h3>Drag & Drop files or Browse Supported</h3>
          <small>Formats: JPEG, PNG, DOC, PDF</small>
        </div>
      </div>
      <Upload {...props}>
        <div ref={triggerUploadRef}></div>
      </Upload>
      <Button
        onClick={handleUpload}
        disabled={fileList.length === 0 || uploading}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};

export default UploadFiles;
