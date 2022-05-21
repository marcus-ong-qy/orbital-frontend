import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import Button from '../../components/Button/Button';
// import InputField from '../../components/InputFields/InputField';
// import PasswordInputField from '../../components/InputFields/PasswordInputField';
// import {
//   FullNameSpan,
//   RegisterDiv,
//   RegisterDivTitle,
//   StyledRegisterPage,
// } from './styles/RegisterPage_old.styled';

// const RegisterPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: 'onChange' });
//   // const navigate = useNavigate();
//   const [pageNumber, setPageNumber] = useState<1 | 2>(1);

//   return (
//     <StyledRegisterPage>
//       <RegisterDiv>
//         <RegisterDivTitle>Sign Up</RegisterDivTitle>
//         <h2>Page {pageNumber}</h2>
//         {pageNumber === 1 && (
//           <>
//             <FullNameSpan>
//               <InputField
//                 title="FirstName"
//                 placeholder="First Name"
//                 errorLabel="Label"
//                 isError={true}
//                 register={register}
//               />
//               <InputField
//                 title="LastName"
//                 placeholder="Last Name"
//                 errorLabel="Label"
//                 isError={true}
//                 register={register}
//               />
//             </FullNameSpan>
//             <InputField
//               title="Email"
//               placeholder="Email"
//               errorLabel="Label"
//               isError={true}
//               register={register}
//             />
//             <InputField
//               title="Username"
//               placeholder="Preferred Username"
//               errorLabel="Label"
//               isError={true}
//               register={register}
//             />
//             <PasswordInputField
//               type="PasswordSignup"
//               placeholder="Password (min. 8 chars)"
//               errorLabel="Label"
//               isError={true}
//               register={register}
//             />
//             <Button text="Next" onClick={() => setPageNumber(2)} />
//           </>
//         )}
//         {pageNumber === 2 && (
//           <>
//             <InputField
//               title="Mobile"
//               placeholder="Mobile No. (+65)"
//               errorLabel="Label"
//               isError={true}
//               register={register}
//             />
//             <InputField
//               title="Address"
//               placeholder="Address"
//               errorLabel="Label"
//               isError={true}
//               register={register}
//             />
//             <InputField
//               title="PostalCode"
//               placeholder="Postal Code"
//               errorLabel="Label"
//               isError={true}
//               register={register}
//             />
//             <Button text="Sign Up" onClick={() => setPageNumber(1)} />
//           </>
//         )}
//       </RegisterDiv>
//     </StyledRegisterPage>
//   );
// };

// export default RegisterPage;
