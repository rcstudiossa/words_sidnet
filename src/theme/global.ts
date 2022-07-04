import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Crimson Pro', 'Roboto', sans-serif; 
   }

   #root{
       margin: 0;
   }

   input {
        outline: none;
        border:none;
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;  
   }

   ul {
        list-style-type: none;
   }
`;
