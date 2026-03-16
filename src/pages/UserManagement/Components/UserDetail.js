import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Table,
  CustomInput,
  FormFeedback,
  Alert
} from 'reactstrap';
import { Plus } from 'react-feather';
import HomeIcon from '@mui/icons-material/Home';

const moduleFlags = {
  'Route Planner': 'routeplannerflg',
  Scheduler: 'schedulerflg',
  'Calendar View': 'calendarrpflg',
  'Map View': 'mapviewrpflg',
  'SC Reports': 'screportsflg',
  'Fleet Management': 'fleetmgmtflg',
  'User Profile': 'usermgmtflg',
  'Add PickTickets': 'addPicktcktflg',
  'Remove Pick Tickets': 'removePicktcktflg'
};

const initialUser = {
  updtick: 0,
  xlogin: '',
  xpswd: '',
  xusrname: '',
  xact: 0,
  credattim: '',
  upddattim: '',
  auuid: '',
  creusr: '',
  updusr: '',
  email: '',
  phone: '',
  tel: '',
  lngmain: '',
  lansec: '',
  bpadd: '',
  bpadd1: '',
  bpadd2: '',
  pincode: '',
  city: '',
  state: '',
  country: 'US',
  rowid: '',
  routeplannerflg: 0,
  schedulerflg: 0,
  calendarrpflg: 0,
  mapviewrpflg: 0,
  screentsflg: 0,
  fleetmgmtflg: 0,
  usermgmtflg: 0,
  addPicktcktflg: 0,
  removePicktcktflg: 0,
  alignedSites: [
    {
      fcy: '',
      updtick: 0,
      lineno: 1 * 1000,
      rout: 0,
      map: 0,
      defflg: '0',
      email: '',
      phone: '',
      role: '',
      credattim: new Date().toISOString(),
      upddattim: new Date().toISOString(),
      auuid: '',
      creusr: '',
      updusr: ''
    }
  ],
  screportsflg: 0
};

function UserForm({ selectedUser, onSave, onCancel, selectedUserDetails, availableSites }) {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const cardBodyRef = useRef(null);
  const checkboxStyle = {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginRight: '6px',
    marginTop: '0'
  };

  useEffect(() => {
    setErrors({});
    setGeneralError('');

    if (selectedUser) {
      try {
        setUser((prevUser) => ({
          ...prevUser,
          ...selectedUserDetails,
          alignedSites: Array.isArray(selectedUserDetails.alignedSites)
            ? selectedUserDetails.alignedSites
            : []
        }));
      } catch (error) {
        console.error('Error setting user data:', error);
        setGeneralError('Error loading user data. Please try again.');
      }
    } else {
      setUser(initialUser);
    }
  }, [selectedUser, selectedUserDetails]);

  const handleCancel = (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    onCancel();
  };

  const handleScrollTo = (event, id) => {
    event.preventDefault();
    const targetElement = document.getElementById(id);
    const container = cardBodyRef.current || document.querySelector('.user-detail-cardbody');

    if (targetElement && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const targetPosition = Math.max(
        0,
        targetRect.top - containerRect.top + container.scrollTop - 90
      );

      container.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleModuleChange = (flagName) => {
    setUser((prev) => ({
      ...prev,
      [flagName]: prev[flagName] === 2 ? 0 : 2
    }));
  };

  const hasDuplicateSites = () => {
    const selectedSites = user.alignedSites.map((site) => site.fcy).filter(Boolean);
    return new Set(selectedSites).size !== selectedSites.length;
  };

  const handleSiteChange = (index, field, value) => {
    setUser((prev) => {
      const updatedSites = prev.alignedSites.map((site, i) =>
        i === index ? { ...site, [field]: value } : site
      );

      const newUser = { ...prev, alignedSites: updatedSites };
      if (hasDuplicateSites()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          alignedSites: 'Duplicate site selection is not allowed'
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, alignedSites: '' }));
      }
      return newUser;
    });
  };

  const addNewSite = () => {
    const hasEmptySite = user.alignedSites.some((site) => !site.fcy);
    if (hasEmptySite) {
      setErrors((prev) => ({
        ...prev,
        alignedSites: 'Please select a site before adding a new one.'
      }));
      return;
    }

    const newSite = {
      fcy: '',
      updtick: 0,
      lineno: (user.alignedSites.length + 1) * 1000,
      rout: 0,
      map: 0,
      defflg: '0',
      email: '',
      phone: '',
      role: '',
      credattim: new Date().toISOString(),
      upddattim: new Date().toISOString(),
      auuid: '',
      creusr: '',
      updusr: ''
    };

    setUser((prev) => ({
      ...prev,
      alignedSites: [...prev.alignedSites, newSite]
    }));

    setErrors((prev) => ({
      ...prev,
      alignedSites: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const MAX_LOGIN_LENGTH = 10;
    const MAX_PASSWORD_LENGTH = 10;
    const MAX_NAME_LENGTH = 30;

    if (!user.xlogin || !user.xlogin.trim()) newErrors.xlogin = 'User ID is required';
    else if (user.xlogin.trim().length > MAX_LOGIN_LENGTH) {
      newErrors.xlogin = `User ID must be ${MAX_LOGIN_LENGTH} characters or less`;
    }

    if (!user.xpswd || !user.xpswd.trim()) newErrors.xpswd = 'Password is required';
    else if (user.xpswd.trim().length > MAX_PASSWORD_LENGTH) {
      newErrors.xpswd = `Password must be ${MAX_PASSWORD_LENGTH} characters or less`;
    }

    if (user.xusrname && user.xusrname.trim().length > MAX_NAME_LENGTH) {
      newErrors.xusrname = `Name must be ${MAX_NAME_LENGTH} characters or less`;
    }

    if (!user.pincode || !user.pincode.trim()) newErrors.pincode = 'Postal Code is required';
    if (!user.tel || !user.tel.trim()) newErrors.tel = 'Telephone number is required';
    if (!user.phone || !user.phone.trim()) newErrors.phone = 'Phone number is required';

    if (!user.email || !user.email.trim()) {
      newErrors.email = 'Email id is required';
    } else if (!emailRegex.test(user.email.trim())) {
      newErrors.email = 'Invalid Email format';
    }

    if (!user.lngmain || !user.lngmain.trim()) newErrors.lngmain = 'Primary language is required';
    if (user.lansec && user.lngmain && user.lngmain.trim() === user.lansec.trim()) {
      newErrors.lansec = 'Primary and Secondary langaues must be different';
    }

    if (!user.alignedSites || user.alignedSites.length === 0) {
      newErrors.alignedSites = 'At least one site is required';
    } else if (user.alignedSites.some((site) => !site.fcy)) {
      newErrors.alignedSites = 'All added sites must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateUser = async (userData) => {
    try {
      const response = await fetch(`/api/update/${userData.xlogin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const nowIso = new Date().toISOString();
        const normalizedUser = {
          ...user,
          xlogin: (user.xlogin || '').trim(),
          xpswd: (user.xpswd || '').trim(),
          xusrname: (user.xusrname || '').trim(),
          email: (user.email || '').trim(),
          phone: (user.phone || '').trim(),
          tel: (user.tel || '').trim(),
          pincode: (user.pincode || '').trim(),
          city: (user.city || '').trim(),
          state: (user.state || '').trim(),
          bpadd: (user.bpadd || '').trim(),
          bpadd1: (user.bpadd1 || '').trim(),
          bpadd2: (user.bpadd2 || '').trim(),
          credattim: user.credattim || nowIso,
          upddattim: nowIso,
          xact: user.xact === 2 ? 2 : 0,
          alignedSites: (user.alignedSites || []).map((site) => ({
            ...site,
            fcy: (site.fcy || '').trim(),
            role: (site.role || '').trim(),
            defflg: site.defflg === '2' ? '2' : '0',
            credattim: site.credattim || nowIso,
            upddattim: nowIso
          }))
        };

        onSave(normalizedUser);
      } catch (error) {
        console.error('Error saving user data:', error);
        setGeneralError('Error saving user data. Please try again.');
      }
    }
  };

  return (
    <Card className="h-100 m-0" style={{ color: 'black', fontSize: '16px' }}>
      <CardBody
        innerRef={cardBodyRef}
        id="cardbody"
        className="user-detail-cardbody overflow-auto relative py-0 px-2 m-0"
        style={{
          height: 'calc(80vh - 156px)',
          scrollBehavior: 'smooth',
          overflowY: 'auto'
        }}
      >
        <Form onSubmit={handleSubmit}>
          <div
            style={{
              height: '100%',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'white'
            }}
          >
            <div style={{ display: 'flex', gap: 40, fontSize: '1.1rem' }}>
              <a
                href="#home"
                style={{
                  color: activeTab === 'home' ? 'green' : 'black',
                  borderBottom: activeTab === 'home' ? '5px solid green' : '',
                  textDecoration: 'none'
                }}
                onClick={(e) => handleScrollTo(e, 'home')}
              >
                <HomeIcon />
              </a>
              <a
                href="#addressDetails"
                style={{
                  color: activeTab === 'addressDetails' ? 'green' : 'black',
                  borderBottom: activeTab === 'addressDetails' ? '5px solid green' : '',
                  textDecoration: 'none'
                }}
                onClick={(e) => handleScrollTo(e, 'addressDetails')}
              >
                Address Detail
              </a>
              <a
                href="#modules"
                style={{
                  color: activeTab === 'modules' ? 'green' : 'black',
                  borderBottom: activeTab === 'modules' ? '5px solid green' : '',
                  textDecoration: 'none'
                }}
                onClick={(e) => handleScrollTo(e, 'modules')}
              >
                Modules
              </a>
              <a
                href="#userAssignedSites"
                style={{
                  color: activeTab === 'userAssignedSites' ? 'green' : 'black',
                  borderBottom: activeTab === 'userAssignedSites' ? '5px solid green' : '',
                  textDecoration: 'none'
                }}
                onClick={(e) => handleScrollTo(e, 'userAssignedSites')}
              >
                User Assigned Sites
              </a>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
              <Button color="success" onClick={handleSubmit}>
                {selectedUser ? 'Update' : 'Create'}
              </Button>
              <Button color="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>

          {generalError && <Alert color="danger" className="mt-3">{generalError}</Alert>}

          <h4 id="home" className="mt-3 text-bold">Home</h4>
          <div className="custom-divider"></div>
          <div className="mt-2 responsive-form">
            <FormGroup className="form-item text-input">
              <Label for="xlogin">User ID<span className="text-danger">*</span></Label>
              <Input
                type="text"
                name="xlogin"
                id="xlogin"
                value={user.xlogin || ''}
                onChange={handleChange}
                invalid={!!errors.xlogin}
                readOnly={!isNewUser}
                maxLength={10}
              />
              <FormFeedback>{errors.xlogin}</FormFeedback>
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="xusrname">Name</Label>
              <Input
                type="text"
                name="xusrname"
                id="xusrname"
                value={user.xusrname || ''}
                onChange={handleChange}
                invalid={!!errors.xusrname}
                maxLength={30}
              />
              <FormFeedback>{errors.xusrname}</FormFeedback>
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="xpswd">Password<span className="text-danger">*</span></Label>
              <Input
                type="password"
                name="xpswd"
                id="xpswd"
                value={user.xpswd || ''}
                onChange={handleChange}
                invalid={!!errors.xpswd}
                maxLength={10}
              />
              <FormFeedback>{errors.xpswd}</FormFeedback>
            </FormGroup>

            <FormGroup check className="form-item checkbox-input" style={{ alignSelf: 'center' }}>
              <Label check style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 0 }}>
                <Input
                  type="checkbox"
                  id="xact"
                  name="xact"
                  checked={user.xact === 2}
                  style={checkboxStyle}
                  onChange={(e) => {
                    const nextValue = e.target.checked ? 2 : 0;
                    setUser((prev) => ({ ...prev, xact: nextValue }));
                    if (errors.xact) {
                      setErrors((prev) => ({ ...prev, xact: '' }));
                    }
                  }}
                />{' '}
                Active
              </Label>
            </FormGroup>

            <FormGroup className="form-item dropdown-input">
              <Label for="lngmain">Primary language<span className="text-danger">*</span></Label>
              <div className="position-relative">
                <CustomInput
                  type="select"
                  name="lngmain"
                  id="lngmain"
                  value={user.lngmain || ''}
                  invalid={!!errors.lngmain}
                  onChange={handleChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    paddingRight: user.lngmain ? '2rem' : undefined,
                    backgroundImage: user.lngmain
                      ? 'none'
                      : 'url("data:image/svg+xml,%3Csvg fill=\'%23333\' height=\'16\' viewBox=\'0 0 24 24\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center'
                  }}
                >
                  <option value="" disabled hidden>Select language</option>
                  {user.lansec !== 'EN' && <option value="EN">English</option>}
                  {user.lansec !== 'ES' && <option value="ES">Spanish</option>}
                  {user.lansec !== 'FR' && <option value="FR">French</option>}
                </CustomInput>

                {user.lngmain && (
                  <span
                    onClick={() => setUser((prev) => ({ ...prev, lngmain: '' }))}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      color: '#999',
                      zIndex: 2,
                      pointerEvents: 'auto'
                    }}
                    title="Clear"
                  >
                    x
                  </span>
                )}
              </div>
              {errors.lngmain && <div className="invalid-feedback d-block">{errors.lngmain}</div>}
            </FormGroup>

            <FormGroup className="form-item dropdown-input">
              <Label for="lansec">Second Language</Label>
              <div className="position-relative">
                <CustomInput
                  type="select"
                  name="lansec"
                  id="lansec"
                  value={user.lansec || ''}
                  invalid={!!user.lansec && user.lngmain === user.lansec}
                  onChange={handleChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    paddingRight: user.lansec ? '2rem' : undefined,
                    backgroundImage: user.lansec
                      ? 'none'
                      : 'url("data:image/svg+xml,%3Csvg fill=\'%23333\' height=\'16\' viewBox=\'0 0 24 24\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center'
                  }}
                >
                  <option value="" disabled hidden>Select language</option>
                  {user.lngmain !== 'EN' && <option value="EN">English</option>}
                  {user.lngmain !== 'ES' && <option value="ES">Spanish</option>}
                  {user.lngmain !== 'FR' && <option value="FR">French</option>}
                </CustomInput>

                {user.lansec && (
                  <span
                    onClick={() => setUser((prev) => ({ ...prev, lansec: '' }))}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      color: '#999',
                      zIndex: 2,
                      pointerEvents: 'auto'
                    }}
                    title="Clear"
                  >
                    x
                  </span>
                )}
              </div>
              {errors.lansec && <div className="invalid-feedback d-block">{errors.lansec}</div>}
            </FormGroup>
          </div>

          <h4 id="addressDetails" className="mt-5 text-bold">Address Detail</h4>
          <div className="custom-divider"></div>
          <div className="mt-2 responsive-form">
            <FormGroup className="form-item text-input">
              <Label for="bpadd">Address line 1</Label>
              <Input type="text" name="bpadd" id="bpadd" value={user.bpadd || ''} onChange={handleChange} />
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="bpadd1">Address line 2</Label>
              <Input type="text" name="bpadd1" id="bpadd1" value={user.bpadd1 || ''} onChange={handleChange} />
            </FormGroup>

            <FormGroup className="form-item dropdown-input">
              <Label for="country">Country</Label>
              <CustomInput type="select" name="country" id="country" value={user.country || ''} onChange={handleChange}>
                <option value="US">United States of America</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </CustomInput>
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="pincode">Postal code<span className="text-danger">*</span></Label>
              <Input
                type="text"
                name="pincode"
                id="pincode"
                value={user.pincode || ''}
                onChange={handleChange}
                invalid={!!errors.pincode}
              />
              <FormFeedback>{errors.pincode}</FormFeedback>
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" value={user.city || ''} onChange={handleChange} />
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="state">Region</Label>
              <Input type="text" name="state" id="state" value={user.state || ''} onChange={handleChange} />
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="tel">Telephone<span className="text-danger">*</span></Label>
              <Input
                type="text"
                name="tel"
                id="tel"
                value={user.tel || ''}
                invalid={!!errors.tel}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    [8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode) ||
                    (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x'))
                  ) {
                    return;
                  }
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <FormFeedback>{errors.tel}</FormFeedback>
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="phone">Phone number<span className="text-danger">*</span></Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={user.phone || ''}
                invalid={!!errors.phone}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                  if (
                    [8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode) ||
                    (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x'))
                  ) {
                    return;
                  }
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <FormFeedback>{errors.phone}</FormFeedback>
            </FormGroup>

            <FormGroup className="form-item text-input">
              <Label for="email">Email <span className="text-danger">*</span></Label>
              <div className="position-relative">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={user.email || ''}
                  onChange={handleChange}
                  invalid={!!errors.email}
                  style={{
                    paddingRight: '2.2rem',
                    backgroundImage: 'none'
                  }}
                />

                {(user.email || errors.email) && (
                  <span
                    onClick={() => {
                      setUser((prev) => ({ ...prev, email: '' }));
                      setErrors((prev) => ({ ...prev, email: 'Email id is required' }));
                    }}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#dc3545',
                      zIndex: 5,
                      lineHeight: '1'
                    }}
                    title="Clear"
                  >
                    x
                  </span>
                )}
              </div>
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </FormGroup>
          </div>

          <h4 id="modules" className="mt-5 text-bold">Modules</h4>
          <div className="custom-divider"></div>
          <div
            className="mt-2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              columnGap: '1rem',
              rowGap: '0.75rem',
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '7px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {Object.entries(moduleFlags).map(([moduleName, flagName]) => (
              <FormGroup check className="mb-0" key={moduleName}>
                <Label check style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 0 }}>
                  <Input
                    type="checkbox"
                    id={flagName}
                    checked={user[flagName] === 2}
                    style={checkboxStyle}
                    onChange={() => handleModuleChange(flagName)}
                  />{' '}
                  {moduleName}
                </Label>
              </FormGroup>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-5">
            <h4 id="userAssignedSites" className="text-bold mb-0">
              User Assigned Sites{!isNewUser && '*'}
            </h4>
            <Button color="primary" onClick={addNewSite} disabled={hasDuplicateSites()}>
              <Plus size={16} className="mr-1" /> Add Site
            </Button>
          </div>
          <div className="custom-divider"></div>

          <Table responsive bordered className="mt-3">
            <thead>
              <tr>
                <th style={{ background: '#CCD6DB' }}>Site ID <span className="text-danger">*</span></th>
                <th style={{ background: '#CCD6DB' }}>Description</th>
                <th style={{ background: '#CCD6DB' }}>Default Site</th>
              </tr>
            </thead>
            <tbody>
              {user.alignedSites.map((site, index) => (
                <tr key={index}>
                  <td>
                    <FormGroup className="mb-0">
                      <CustomInput
                        type="select"
                        id={`site-${index}`}
                        name={`site-${index}`}
                        className={!isNewUser && !!errors.alignedSites && !site.fcy ? 'is-invalid' : ''}
                        value={site.fcy || ''}
                        onChange={(e) => {
                          const selectedSite = availableSites.find((s) => s.id === e.target.value);
                          handleSiteChange(index, 'fcy', e.target.value);
                          handleSiteChange(index, 'role', selectedSite ? selectedSite.value : '');
                        }}
                      >
                        <option value="">Select a site</option>
                        {availableSites
                          .filter(
                            (siteOption) =>
                              siteOption.id === site.fcy ||
                              !user.alignedSites.some((s, i) => s.fcy === siteOption.id && i !== index)
                          )
                          .map((siteOption) => (
                            <option key={siteOption.id} value={siteOption.id}>
                              {siteOption.id}
                            </option>
                          ))}
                      </CustomInput>
                      {!site.fcy && errors.alignedSites && (
                        <FormFeedback style={{ display: 'block' }}>{errors.alignedSites}</FormFeedback>
                      )}
                    </FormGroup>
                  </td>
                  <td>{availableSites.find((s) => s.id === site.fcy)?.value || ''}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center gap-2">
                      <CustomInput
                        type="radio"
                        id={`defaultSite-${index}`}
                        name="defaultSite"
                        checked={site.defflg === '2'}
                        disabled={!site.fcy}
                        onChange={() => {
                          user.alignedSites.forEach((s, i) => handleSiteChange(i, 'defflg', '0'));
                          handleSiteChange(index, 'defflg', '2');
                        }}
                      />
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => {
                          const updatedSites = user.alignedSites.filter((_, i) => i !== index);
                          setUser((prev) => ({ ...prev, alignedSites: updatedSites }));
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
      </CardBody>
    </Card>
  );
}

UserForm.propTypes = {
  selectedUserDetails: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  availableSites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  ).isRequired
};

export default UserForm;
