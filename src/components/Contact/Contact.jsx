import React from 'react';
import styles from './Contact.module.css';
import Swal from 'sweetalert2';

export const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "ef647ac0-c03d-467c-bb26-36a8af3bd3a6");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          Swal.fire({
            title: "Success!",
            text: "Message sent successfully!",
            icon: "success"
          });
        }
      };
  return (
    <section id="contact" className={styles.contact}>
        <form className={styles.forms} onSubmit={onSubmit}>
            <h2>Contact Me</h2>
            <div className={styles.inputbox}>
                <input type="text" id="name" className={styles.field} placeholder='Enter your Name' name='name' required/>
            </div>
            <div className={styles.inputbox}>
                <input type="email" id="email" className={styles.field} placeholder='Enter your email' name='email'required/>
            </div>
            <div className={styles.inputbox}>

                <textarea id="message" name="message" className={styles.fieldmess} placeholder='Enter your message' required/>
            </div>
            <button className={styles.button} type='submit'>Send Message</button>
 
        </form>
    </section>
    
  );
}