import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function Contact({ language = 'en' }: { language?: 'en' | 'fr' }) {
  const isFrench = language === 'fr';

  const copy = isFrench ? {
    title: 'Contactez-moi',
    description: 'Vous avez un projet en tête ? Travaillons ensemble et concrétisons-le !',
    name: 'Votre nom',
    namePlaceholder: 'Comment vous appelez-vous ?',
    email: 'Email / Téléphone',
    emailPlaceholder: 'Comment puis-je vous joindre ?',
    message: 'Message',
    messagePlaceholder: 'Envoyez-moi vos demandes ou questions',
    send: 'Envoyer',
    nameError: 'Veuillez saisir votre nom',
    emailError: 'Veuillez saisir votre email ou votre numéro',
    messageError: 'Veuillez saisir votre message',
    subject: 'Nouveau message depuis le portfolio',
  } : {
    title: 'Contact Me',
    description: 'Got a project waiting to be realized? Let\'s collaborate and make it happen!',
    name: 'Your Name',
    namePlaceholder: 'What\'s your name?',
    email: 'Email / Phone',
    emailPlaceholder: 'How can I reach you?',
    message: 'Message',
    messagePlaceholder: 'Send me any inquiries or questions',
    send: 'Send',
    nameError: 'Please enter your name',
    emailError: 'Please enter your email or phone number',
    messageError: 'Please enter the message',
    subject: 'New message from the portfolio',
  };

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef<any>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    setNameError(trimmedName === '');
    setEmailError(trimmedEmail === '');
    setMessageError(trimmedMessage === '');

    if (trimmedName === '' || trimmedEmail === '' || trimmedMessage === '') {
      return;
    }

    const subject = encodeURIComponent(copy.subject);
    const body = encodeURIComponent(
      `${isFrench ? 'Nom' : 'Name'}: ${trimmedName}\n${isFrench ? 'Email / Téléphone' : 'Email / Phone'}: ${trimmedEmail}\n\n${isFrench ? 'Message' : 'Message'}:\n${trimmedMessage}`
    );

    window.location.href = `mailto:zed.bouhadjira@gmail.com?subject=${subject}&body=${body}`;
    setName('');
    setEmail('');
    setMessage('');
    setNameError(false);
    setEmailError(false);
    setMessageError(false);
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                required
                id="outlined-required"
                label={copy.name}
                placeholder={copy.namePlaceholder}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? copy.nameError : ""}
              />
              <TextField
                required
                id="outlined-required"
                label={copy.email}
                placeholder={copy.emailPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? copy.emailError : ""}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label={copy.message}
              placeholder={copy.messagePlaceholder}
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? copy.messageError : ""}
            />
            <Button variant="contained" endIcon={<SendIcon />} onClick={sendEmail}>
              {copy.send}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;