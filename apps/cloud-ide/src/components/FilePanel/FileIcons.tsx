import React from 'react';
import {
  DiPython, DiRuby, DiPhp, DiCss3, DiHtml5, DiDocker, DiGit, DiJava,
  DiSwift, DiAndroid, DiReact, DiVisualstudio, DiUnitySmall
} from 'react-icons/di';
import { FaJsSquare } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import {
  SiRust, SiKotlin, SiCplusplus, SiC, SiCsharp, SiGo, SiLua,
  SiJson, SiYaml, SiGraphql, SiMarkdown, SiLatex, SiPostgresql, SiMysql,
  SiMongodb, SiRedis, SiTerraform, SiAnsible, SiJenkins, SiGnubash, SiPowershell
} from 'react-icons/si';
import {
  AiFillFileImage, AiFillFileText, AiFillFilePdf, AiFillFileWord,
  AiFillFileExcel, AiFillFilePpt, AiFillFileZip
} from 'react-icons/ai';
import { FaVuejs, FaSass, FaRegFileVideo, FaRegFileAudio, FaFont } from 'react-icons/fa';
import { VscFile } from 'react-icons/vsc';

interface IconLibraryConfig {
  scaleFactor: number;
  verticalOffset?: string;
}

// Configuration for different icon libraries to normalize their sizes
const iconLibraryConfigs: { [key: string]: IconLibraryConfig } = {
  Di: { scaleFactor: 1.2, verticalOffset: '-0.125em' },  // DevIcons tend to be smaller
  Fa: { scaleFactor: 1 },  // Font Awesome is our baseline
  Si: { scaleFactor: 1.1 }, // Simple Icons slightly smaller
  Ai: { scaleFactor: 1 },  // Ant Design Icons
  Vsc: { scaleFactor: 1.1 }, // VS Code Icons
  Bi: { scaleFactor: 1.1 }  // Bootstrap Icons
};

interface FileIconMapping {
  icon: React.ElementType;
  color: string;
}

export const fileIconMappings: { [key: string]: FileIconMapping } = {
    // Programming Languages
    'js': { icon: FaJsSquare, color: '#ddc61b' },
    'mjs': { icon: FaJsSquare, color: '#ddc61b' },
    'cjs': { icon: FaJsSquare, color: '#ddc61b' },
    'jsx': { icon: DiReact, color: '#61dafb' },
    'tsx': { icon: DiReact, color: '#61dafb' },
    'ts': { icon: BiLogoTypescript, color: '#3178c6' },
    'py': { icon: DiPython, color: '#3776ab' },
    'java': { icon: DiJava, color: '#ed8b00' },
    'class': { icon: DiJava, color: '#ed8b00' },
    'jar': { icon: DiJava, color: '#ed8b00' },
    'rb': { icon: DiRuby, color: '#cc342d' },
    'php': { icon: DiPhp, color: '#777bb4' },
    'go': { icon: SiGo, color: '#00add8' },
    'rs': { icon: SiRust, color: '#000000' },
    'cpp': { icon: SiCplusplus, color: '#00599c' },
    'c': { icon: SiC, color: '#a8b9cc' },
    'h': { icon: SiC, color: '#a8b9cc' },
    'hpp': { icon: SiCplusplus, color: '#00599c' },
    'cs': { icon: SiCsharp, color: '#239120' },
    'swift': { icon: DiSwift, color: '#f05138' },
    'kt': { icon: SiKotlin, color: '#7f52ff' },
    'lua': { icon: SiLua, color: '#2c2d72' },
  
    // Web Technologies
    'html': { icon: DiHtml5, color: '#e34f26' },
    'htm': { icon: DiHtml5, color: '#e34f26' },
    'css': { icon: DiCss3, color: '#1572b6' },
    'scss': { icon: FaSass, color: '#cc6699' },
    'sass': { icon: FaSass, color: '#cc6699' },
    'vue': { icon: FaVuejs, color: '#4fc08d' },
  
    // Data & Config
    'json': { icon: SiJson, color: '#000000' },
    'yaml': { icon: SiYaml, color: '#cb171e' },
    'yml': { icon: SiYaml, color: '#cb171e' },
    'xml': { icon: AiFillFileText, color: '#000000' },
    'graphql': { icon: SiGraphql, color: '#e10098' },
    'gql': { icon: SiGraphql, color: '#e10098' },
  
    // Documentation
    'md': { icon: SiMarkdown, color: '#000000' },
    'mdx': { icon: SiMarkdown, color: '#000000' },
    'txt': { icon: AiFillFileText, color: '#000000' },
    'pdf': { icon: AiFillFilePdf, color: '#ff0000' },
    'doc': { icon: AiFillFileWord, color: '#2b579a' },
    'docx': { icon: AiFillFileWord, color: '#2b579a' },
    'xls': { icon: AiFillFileExcel, color: '#217346' },
    'xlsx': { icon: AiFillFileExcel, color: '#217346' },
    'ppt': { icon: AiFillFilePpt, color: '#d24726' },
    'pptx': { icon: AiFillFilePpt, color: '#d24726' },
    'tex': { icon: SiLatex, color: '#008080' },
  
    // Images
    'png': { icon: AiFillFileImage, color: '#4a90e2' },
    'jpg': { icon: AiFillFileImage, color: '#4a90e2' },
    'jpeg': { icon: AiFillFileImage, color: '#4a90e2' },
    'gif': { icon: AiFillFileImage, color: '#4a90e2' },
    'svg': { icon: AiFillFileImage, color: '#4a90e2' },
    'webp': { icon: AiFillFileImage, color: '#4a90e2' },
  
    // Audio & Video
    'mp3': { icon: FaRegFileAudio, color: '#f1c40f' },
    'wav': { icon: FaRegFileAudio, color: '#f1c40f' },
    'mp4': { icon: FaRegFileVideo, color: '#e74c3c' },
    'avi': { icon: FaRegFileVideo, color: '#e74c3c' },
    'mov': { icon: FaRegFileVideo, color: '#e74c3c' },
  
    // Fonts
    'ttf': { icon: FaFont, color: '#ff5733' },
    'otf': { icon: FaFont, color: '#ff5733' },
    'woff': { icon: FaFont, color: '#ff5733' },
    'woff2': { icon: FaFont, color: '#ff5733' },
  
    // Archives
    'zip': { icon: AiFillFileZip, color: '#f1c40f' },
    'rar': { icon: AiFillFileZip, color: '#f1c40f' },
    'tar': { icon: AiFillFileZip, color: '#f1c40f' },
    'gz': { icon: AiFillFileZip, color: '#f1c40f' },
  
    // Development & Operations
    'dockerfile': { icon: DiDocker, color: '#2496ed' },
    'dockerignore': { icon: DiDocker, color: '#2496ed' },
    'git': { icon: DiGit, color: '#f05032' },
    'gitignore': { icon: DiGit, color: '#f05032' },
    'sh': { icon: SiGnubash, color: '#4eaa25' },
    'bash': { icon: SiGnubash, color: '#4eaa25' },
    'ps1': { icon: SiPowershell, color: '#5391fe' },
    
    // Build & Package
    'gradle': { icon: DiAndroid, color: '#3ddc84' },
    'vcxproj': { icon: DiVisualstudio, color: '#5c2d91' },
    'sln': { icon: DiVisualstudio, color: '#5c2d91' },
    'unity': { icon: DiUnitySmall, color: '#000000' },
    
    // Database
    'psql': { icon: SiPostgresql, color: '#4169e1' },
    'mysql': { icon: SiMysql, color: '#4479a1' },
    'mongo': { icon: SiMongodb, color: '#47a248' },
    'redis': { icon: SiRedis, color: '#dc382d' },
  
    // Infrastructure & DevOps
    'tf': { icon: SiTerraform, color: '#7b42bc' },
    'tfvars': { icon: SiTerraform, color: '#7b42bc' },
    'ansible': { icon: SiAnsible, color: '#ee0000' },
    'jenkins': { icon: SiJenkins, color: '#d24939' },
  };

interface FileIconProps {
  fileName: string;
  size?: number;
  className?: string;
}

const getIconLibraryPrefix = (iconComponent: React.ElementType): string => {
    // Type assertion to access potential displayName or name
    const component = iconComponent as { displayName?: string; name?: string };
    const componentName = component.displayName || component.name || '';
    return componentName.substring(0, 2);
  };

export const FileIcon: React.FC<FileIconProps> = ({ 
  fileName, 
  size = 18, 
  className = "" 
}) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const iconData = fileIconMappings[extension] || { icon: VscFile, color: '#828282' };
  const IconComponent = iconData.icon;
  
  // Determine which icon library is being used and apply appropriate scaling
  const libraryPrefix = getIconLibraryPrefix(IconComponent);
  const config = iconLibraryConfigs[libraryPrefix] || { scaleFactor: 1 };
  
  const adjustedSize = size * config.scaleFactor;
  
  const style: React.CSSProperties = {
    display: 'inline-block',
    transform: `scale(${config.scaleFactor})`,
    transformOrigin: 'center',
    verticalAlign: config.verticalOffset || 'middle'
  };

  return (
    <span 
      style={style} 
      className={`inline-flex items-center justify-center ${className}`}
    >
      <IconComponent 
        size={adjustedSize} 
        color={iconData.color}
      />
    </span>
  );
};



  