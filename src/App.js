import React, { useEffect, useState } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { listBusinesses } from './graphql/queries';
import { createBusiness as createBusinessMutation, 
         deleteBusiness as deleteBusinessMutation, 
         updateBusiness as updateBusinessMutation } from './graphql/mutations';


const initialFormState = { name: '', about: '' }

const App = () => {
  const [hideLightbox, setHideLightbox] = useState(true);
  const [hideLightbox1, setHideLightbox1] = useState(true);
  const [business, setBusiness] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  let [state, setState] = useState(null);

  useEffect(() => {
    fetchBusiness();
  }, []);

  async function fetchBusiness() {
    const apiData = await API.graphql({ query: listBusinesses });
    const BusinessFromAPI = apiData.data.listBusinesses.items;
    await Promise.all(BusinessFromAPI.map(async business => {
      if (business.image) {
        const image = await Storage.get(business.image);
        business.image = image;
      }
      return business;
    }))
    setBusiness(apiData.data.listBusinesses.items);
  }

  async function createBusiness() {
    if (!formData.name || !formData.about) return;
    await API.graphql({ query: createBusinessMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setBusiness([...business, formData]);
    setFormData(initialFormState);
    window.location.reload();
  }

  async function updateBusiness(){
    const apiData = await API.graphql({ query: listBusinesses });
    const BusinessFromAPI = apiData.data.listBusinesses.items;
    const id_businesses = BusinessFromAPI[0]['id']
    await Promise.all(BusinessFromAPI.map(async business => {
      return business;
    }))
    if(!formData.name || !formData.about) return;
    const updateBusiness ={
      id: id_businesses,
      name: formData.name,
      about: formData.about
    }
  
    await API.graphql({query: updateBusinessMutation, variables: {input: updateBusiness}});
    setBusiness([...business, formData]);
    setFormData(initialFormState);
    window.location.reload();
  }

  async function deleteBusiness({ id }) {
    const newBusinessArray = business.filter(business => business.id !== id);
    setBusiness(newBusinessArray);
    await API.graphql({ query: deleteBusinessMutation, variables: { input: { id } } });
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchBusiness();
  }

  return (
    <div className="App">
      <Container>
        {
          business.map(business => (
            <div>
              <Col md="6" key={business.id || business.name}>
                <h2>{business.name}</h2>
                <p>{business.about}</p>
                <Button onClick={() => deleteBusiness(business)}>Delete Info</Button>
                {
                  business.image && <img src={business.image} style={{ width: 400 }} />
                }
                <Button onClick={() => setHideLightbox(false)}>Edit</Button>

              </Col>
              <Col className={`${hideLightbox ? "hide-lightbox" : "ligthbox"}`}>
                <h1>Business List</h1>
                <input
                  onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                  placeholder={"Bus. Name: " + business.name}
                  value={formData.name}
                />
                <input
                  onChange={e => setFormData({ ...formData, 'about': e.target.value })}
                  placeholder={"About: " + business.about}
                  value={formData.about}
                />
                <br/>
                <Button onClick={updateBusiness}>Update</Button>
                <Button onClick={() => setHideLightbox(true)}>Close</Button>
              </Col>
            </div>
          ))
        }
        {business.map(business => (business.id)) == '' &&
          <Col md="6">
            <h1>Business List</h1>
            <input
              onChange={e => setFormData({ ...formData, 'name': e.target.value })}
              placeholder="Business name"
              value={formData.name}
            />
            <input
              onChange={e => setFormData({ ...formData, 'about': e.target.value })}
              placeholder="about"
              value={formData.about}
            />
            <input
              type="file"
              onChange={onChange}
            />
            <Button onClick={createBusiness}>Save Data</Button>
          </Col>
        }
      </Container>
      <br/>
      <AmplifySignOut />
    </div>

  );
}

export default withAuthenticator(App);