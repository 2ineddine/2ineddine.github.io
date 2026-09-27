// import React from "react";
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import '../assets/styles/Main.scss';

// function Main() {

//   return (
//     <div className="container">
//       <div className="about-section">
//         <div className="image-wrapper">
//           <img src={require("../assets/images/me.png")} alt="Avatar" />
//         </div>
//         <div className="content">
//           <div className="social_icons">
//             <a href="https://github.com/2ineddine" target="_blank" rel="noreferrer"><GitHubIcon/></a>
//             <a href="https://fr.linkedin.com/in/zineddine-bouhadjira" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
//           </div>
//           <h1>Zineddine Bouhadjira</h1>
//           <p>Your Title Here</p>

//           <div className="mobile_social_icons">
//             <a href="https://github.com/2ineddine" target="_blank" rel="noreferrer"><GitHubIcon/></a>
//             <a href="https://fr.linkedin.com/in/zineddine-bouhadjira" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Main;


import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Main.scss';

function Main({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const title = language === 'fr' ? 'Data Scientist | Ingénieur IA' : 'Data Scientist | AI Engineer';

  return (
    <div className="container" id="home">
      <div className="about-section">
        <div className="content hero-copy">
          <h1>Zineddine Bouhadjira</h1>
          <p className="role">{title}</p>

          <div className="social_icons">
            <a href="https://github.com/2ineddine" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://fr.linkedin.com/in/zineddine-bouhadjira" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:zed.bouhadjira@gmail.com" target="_blank" rel="noreferrer"><EmailIcon/></a>
          </div>

          <div className="mobile_social_icons">
            <a href="https://github.com/2ineddine" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://fr.linkedin.com/in/zineddine-bouhadjira" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:zed.bouhadjira@gmail.com" target="_blank" rel="noreferrer"><EmailIcon/></a>
          </div>
        </div>

        <div className="image-wrapper">
          <img src={require("../assets/images/me.png")} alt="Zineddine Bouhadjira" />
        </div>
      </div>
    </div>
  );
}

export default Main;