import React from 'react';
import { QUERY_FILES } from '../utils/queries'
import { useQuery} from "@apollo/client";
import Auth from '../utils/auth'
import { useMutation } from "@apollo/client";
import { REMOVE_WORK } from '../utils/mutations'
import Login from './Loginpage'

const FilesPage = ({ files, handle}) => {

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  
  let profile = Auth.getProfile();
  let userId = profile.data._id
  const { loading, error, data, refetch } = useQuery(QUERY_FILES, {
    variables: {
      _id: userId,
    },
  });


  if(loading === false){
   
  }
  if (error) {
    console.error(error)
  }
  
  
  const [removeWork, {load}] = useMutation(REMOVE_WORK);
  if(!token){
    return <Login />
  }
  
  // download file to users computer
  const downloadFile = (e) =>{
    const currentDate = new Date();
    const uniqueNumber = currentDate.getTime();
    const fileName = `algorithm${uniqueNumber}.txt`
    let textContent = e.target.parentElement.parentElement.innerText;
    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' }); //create blob and then put the text content inside to create the file
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
    URL.revokeObjectURL(element.href);
    
  }
  
  const deleteFile = async (e)=>{  // delete file by getting key id value and then using that ID to reference deleting in the db 
    const toDelete = e.target.parentElement.parentElement.id;

    const {data} = await removeWork({
      variables: { _id: userId, id: toDelete}})
   refetch();     
    }
    const hasFiles = data && data.savedFiles && data.savedFiles.savedWork.length > 0;

  return (
    <div style={{ display: 'flex',justifyContent: 'center',
        alignItems: 'center', //height: '100vh',
        backgroundColor: '#f6f8fa', }}>
      <div id={'files'} style={{ width: '75%',padding: '20px', backgroundColor: '#fff',
          borderRadius: '6px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', position: 'relative', bottom: '15%'
        }}>
        <h1 style={{ marginTop: 0, marginBottom: '20px', fontSize: '24px', color: '#24292e',}}>
          My Files
        </h1>
        {!loading? (
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0, }}>
        { data.savedFiles.savedWork.map((file, index) => {
          let question = file.question;
          let solution = file.solution;
      return (
        <div id={index} key={index}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
          padding: '10px', backgroundColor: '#f2f2f2', borderRadius: '6px', textAlign: 'center', minHeight: '100px',wordWrap: 'break-word',
          overflowWrap: 'break-word', overflow: 'auto', fontSize: '16px', '@media (minWidth: 768px)': { fontSize: '18px', // Adjust font size for screens larger than 768px
                    },
                '@media (maxWidth: 480px)': {
                  fontSize: '14px', // Adjust font size for screens smaller than 480px 
                  },}}>
                <li>
                  <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word',}}>
                      {question}
                    </p>
                    <pre style={{ whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-word' }}>
                      {solution}
                    </pre>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <button
                      style={{ padding: '8px 15px', border: 'none', backgroundColor: '#4caf50', color: '#ffffff',
                        borderRadius: '3px', cursor: 'pointer', }} onClick={downloadFile}>
                      Download
                    </button>
                    <button
                      style={{ padding: '8px 15px', border: 'none', backgroundColor: '#4caf50', color: '#ffffff',
                        borderRadius: '3px', cursor: 'pointer', }}
                      onClick={deleteFile}>
                      DELETE
                    </button>
                  </div>
                </li>
              </div> ); })}
          </ul> ) : (
          <p style={{ marginTop: 0,marginBottom: 0, fontSize: '16px',color: '#999',}}>
           Loading Files..</p>)}
        {!hasFiles ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '100vh', backgroundColor: '#f6f8fa', }}>
        <p>No Saved Files</p>
        </div>
        ) : null}
          </div>
        </div>
        );
        };

export default FilesPage;
