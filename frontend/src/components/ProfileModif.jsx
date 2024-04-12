import React, { useState,useEffect } from 'react';
import NavBar from './NavBar';
import Sidebar ,{SidebarItem}from './SideBar';
import { School ,Settings,LogOut} from 'lucide-react';
import Message from './Message';
import Image from './Image';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";
import {  Dribbble } from 'lucide-react';





const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
  // Add more links as needed
];

const ProfileModif = () => {
  const { user } = useAuthContext();
  const role = user.__t ;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [nom, setNom] = useState(user.userObj.nom);
  const [prenom, setPrenom] = useState(user.userObj.prenom);
  const [email, setEmail] = useState(user.userObj.email);
  const [tel, setTel] = useState(user.userObj.tel);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [width, setWidth] = useState();
    const handleWidth = (width) => {
      setWidth(width);
    }
    useEffect(() => {
      handleWidth(width);
    },[width]);
    const [w, setW] = useState();
    const handleW = (width) => {
      if (width === 284){
      setW(width);}
      else {setW(width);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);

  const handleImageUpload = async (file) => {
    setImage(file); // Set the uploaded image in state
  };

  const getPasswordStrength = (password) => {
    // Define your password strength criteria here
    const strength = {
      0: 'Worst',
      1: 'Bad',
      2: 'Weak',
      3: 'Good',
      4: 'Strong',
    };

    // You can customize the criteria as per your requirements
    const minLength = 8;
    const minLowercase = 1;
    const minUppercase = 1;
    const minNumbers = 1;

    let score = 0;

    // Check for minimum length
    if (password.length >= minLength) {
      score++;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      score++;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      score++;
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
      score++;
    }

    return strength[score];
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      console.log("click : entrain de modifier le profile");
      let url;
      let updatedFields = {
        nom: nom,
        prenom: prenom,
        email: email,
        tel: tel,
        image :user.userObj.image,
        // Add other fields as necessary
      };
      if (password) { // ken password feragh ma yhezouch
        updatedFields.password = password;
      }
      if (image) {
        const storageRef = ref(storage, `profilepictures/${user.userObj._id}`);
        const imageSnapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(imageSnapshot.ref);
        updatedFields.image = imageUrl;
        console.log(imageUrl);
      }

      if (user.userObj.__t === 'Particulier') {
        url = `http://localhost:4000/api/users/update_particulier/${user.userObj._id}`;
      } else if (user.userObj.__t === 'Responsable') {
        url = `http://localhost:4000/api/users/update_responsable/${user.userObj._id}`;
      }

      const response = await axios.patch(url, updatedFields);
      if (response.status === 200) {
        console.log(response);
        setIsSuccess(true);
      }
      console.log(response);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle profile update errors
    }
  };

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const password2Input = document.getElementById('password2');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      password2Input.type = 'password';
    } else {
      passwordInput.type = 'password';
      password2Input.type = 'password';
    }
  };

  const getPasswordStrengthColor = (password) => {
    const strength = getPasswordStrength(password);
    switch (strength) {
      case 'Worst':
        return 'red';
      case 'Bad':
        return 'orange';
      case 'Weak':
        return 'yellow';
      case 'Good':
        return 'lightgreen';
      case 'Strong':
        return 'green';
      default:
        return 'black';
    }
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-row'>
      {role === 'Responsable' ? (
        <Sidebar sendWidth={handleWidth}>
          <SidebarItem icon={<School />} text="profile responsable" link={'responsable'} />
          <SidebarItem icon={< Dribbble />} text="list terrain" link={`terrain/responsable`} />
          <SidebarItem icon={<ListPlus /> } text="reservation list" link={'reservation/listR'} />
        </Sidebar>
      ) : (
        <Sidebar sendWidth={handleWidth}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faSearch} />}
            text={<SearchBox onSearch={handleSearch} />}
            test={true}
          />
          <SidebarItem icon={<School />} text="Home" link={'particulier'} />
          <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
          <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
          <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
          <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
          <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />
        </Sidebar>
      )}
        <div className={`ml-[${w}px} mt-[82px] flex justify-between items-center flex-col px-12 w-[100%]`}>
          <h1 className='bold-52 my-6'>Modifier le profil</h1>
          <form className='flex flex-col'>
            <label htmlFor='nom' className='text-2xl text-bold m-2'>
              Nom
            </label>
            <input
              type='text'
              name='nom'
              id='nom'
              className='border bg-gray-100 border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200'
              placeholder='Nom'
              defaultValue={user.userObj.nom}
              onChange={(e) => {
                setNom(e.target.value);
              }}
            />
            <label htmlFor='prenom' className='text-2xl text-bold m-2'>
              Prénom
            </label>
            <input
              type='text'
              name='prenom'
              id='prenom'
              className='border bg-gray-100 border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200'
              placeholder='Prénom'
              defaultValue={user.userObj.prenom}
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            />
            <label htmlFor='email' className='text-2xl text-bold m-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='border bg-gray-100 border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200'
              placeholder='Email'
              defaultValue={user.userObj.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor='tel' className='text-2xl text-bold m-2'>
              Numéro de téléphone
            </label>
            <input
              type='text'
              name='tel'
              id='tel'
              className='border bg-gray-100 border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200'
              placeholder='Numéro de téléphone'
              defaultValue={user.userObj.tel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
            <label htmlFor="Photo" className='text-2xl text-bold m-2'>Photo</label>
            <Image onImageUpload={handleImageUpload} />
            <label htmlFor='password' className='text-2xl text-bold m-2'>
              Mot de passe
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='border bg-gray-100 border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200'
              placeholder='Mot de passe'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type='checkbox'
              onClick={togglePasswordVisibility}
            />{' '}
            Afficher le mot de passe
            <label htmlFor='password2' className='text-2xl text-bold m-2'>
              Confirmer le mot de passe
            </label>
            <input
              type='password'
              name='password2'
              id='password2'
              className='border bg-gray-100 border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200'
              placeholder='Confirmer le mot de passe'
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <p
              style={{ color: getPasswordStrengthColor(password) }}
            >
              password strength : {getPasswordStrength(password)}
            </p>
            {password !== password2 && (
              <p className='text-red-500 text-xl text-bold w-[500px]'>
                take care, the passwords are not the same
              </p>
            )}
            <input
              type='submit'
              value='Modifier'
              className='border border-green-500 bg-green-500 cursor-pointer text-white rounded-3xl p-2 m-5 w-1/4'
              onClick={handleSubmit}
            />
          </form>
          {isSuccess && <Message />}
        </div>
      </div>
    </>
  );
};

export default ProfileModif;
