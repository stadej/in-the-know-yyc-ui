import { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const App = () => {

  const router = useRouter();

  const [frmOrganizationName, setFrmOrganizationName] = useState('');
  const handleSubmit = () => {
      console.log(' - - - - - - - ');
      console.log('DATA FOR SAVING:');
      console.log('organization', frmOrganizationName);
      console.log(' - - - - - - - ');
      console.log(' - - - - - - - ');


  }

  useEffect(() => {
    router.push('/cms/login');
  }, [router]);

  const handleChange = useCallback((e) => {
    setFrmOrganizationName(e.target.value);
  }, []);



  return (
    <>
      INDEX
    
      {/* <Input label="Organization/host" defaultValue={''} value={frmOrganizationName} onValueChange={setFrmOrganizationName} isRequired className="max-w-xs" /> */}
      <Input label="Organization/host" value={frmOrganizationName} onChange={handleChange} />
      <Button onPress={handleSubmit}>try!</Button>
      
      
    </>
  );
}

export default memo(App)


// import React from "react";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

// export default function App() {
//   const {isOpen, onOpen, onClose} = useDisclosure();
//   const [size, setSize] = React.useState('md')
//   const [backdrop, setBackdrop] = React.useState('opaque')

//   const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
//   const backdrops = ["opaque", "blur", "transparent"];


//   const handleOpen = (size) => {
//     setSize(size)
//     //onOpen();
//   }
//   const handleBackdrop = (backdrop) => {
//     setBackdrop(backdrop)
//   }

//   return (
//     <>
//     <div className="flex flex-wrap gap-3">
//     <Button onPress={onOpen}>Open modal</Button>
//     </div>
//       <div className="flex flex-wrap gap-3">
//         <p>Modal backdrops: {backdrop}</p>
//         {backdrops.map((b) => (
//           <Button  
//             key={b}
//             variant="flat" 
//             color="warning" 
//             onPress={() => handleBackdrop(b)}
//             className="capitalize"
//           >
//            {b}
//           </Button>
//         ))}  
//       </div>
//       <div className="flex flex-wrap gap-3">
//         <p>Modal sizes: {size}</p>
//         {sizes.map((size) => (
//           <Button key={size} onPress={() => handleOpen(size)}>Open {size}</Button>
//         ))}  
//       </div>
//       <Modal 
//         size={size} 
//         isOpen={isOpen} 
//         onClose={onClose} 
//         backdrop={backdrop}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
//               <ModalBody>
//                 <p> 
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
//                   dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
//                   Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
//                 </p>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
