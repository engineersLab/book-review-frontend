import React from 'react'
import {Form, Button} from 'react-bootstrap'


const footer = () =>{

    const facebook = require('../assets/facebook.svg')
    const instagram = require('../assets/instagram.svg')
    const linkedIn = require('../assets/linkedin.svg')
    const twitter = require('../assets/twitter.svg')

    return(
        <footer style={{background:'#0E3C54', color:'white', marginTop:70,minHeight:200,overflowX:'hidden'}}>
            <div className='row cus-top-margin-2 cus-bottom-margin-2'>
                <div className='col d-flex justify-content-center text-center'>
                    <div>
                        <div>
                            <p style={{color:'orange'}} >FOLLOW US</p>
                        </div>
                        <div>
                            <a href='#'>
                                <img src={facebook} style={{height:20, marginRight:10}} className='img-fluid' />
                            </a>
                            <a href='#'>
                                <img src={instagram} style={{height:20,marginLeft:10, marginRight:10}} className='img-fluid' />
                            </a>
                            <a href='#'>
                                <img src={linkedIn} style={{height:20,marginLeft:10, marginRight:10}} className='img-fluid' />
                            </a>
                            <a href='#'>
                                <img src={twitter} style={{height:20,marginLeft:10, marginRight:10}} className='img-fluid' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='col d-flex justify-content-center'>
                    <div>
                        <div>
                            <p style={{color:'orange',textAlign:'center'}} >LEAVE US A MESSAGE</p>
                        </div>
                        <Form style={{width:500}}>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control className='cus-form-input' type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Message</Form.Label>
                                <Form.Control className='cus-form-input' as="textarea" rows={3} placeholder="Enter your message" />
                            </Form.Group>
                        </Form>
                        <div className='text-center' >
                            <Button >Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default footer