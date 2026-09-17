import { useContext, useState } from 'react';
import { SectionContainerRed } from '../components/SectionContainerRed/SectionContainerRed';
import { SectionTitle } from '../components/SectionTitle/SectionTitle';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router';
import { SectionContainer } from '../components/SectionContainer/SectionContainer';
import { FormLabel } from '../components/FormLabel/FormLabel';
import { useForm } from 'react-hook-form';
import { Dropdown, DropdownItem } from '../components/DropDown/DropDown';
import { useFetch } from '../hooks/useFetch';
import { Button } from '../components/Button/Button';

export function CreateJobPage() {

  const { authToken } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors }, watch} = useForm()

  const [ jobResponse, setJobResponse ] = useState('')

  const { data: regionData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/regions')
  console.log('regionData: ', regionData)

  const { data: workTypesData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/worktypes')
  console.log('workTypesData: ', workTypesData)

  const { data: categoryData } = useFetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-categories')
  console.log('categoryData: ', categoryData)

  // den siger at region is missing både når jeg sender region og regionId eller begge dele til API.. Jeg kan ikke finde fejlen pt. 

  const createJob = async (data) => {
    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_BASE_URL + '/api/job-listings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken.accessToken}`
        },
        body: JSON.stringify({
          title: data.title,
          organization: data.organization,
          regionId: data.regionId,
          // region: data.region,
          jobCategoryId: data.jobCategory,
          workTypeId: data.workTypeId,
          workHome: data.workHome,
          address: data.address,
          city: data.city,
          description: data.description,
          
        })
        
      })
      const responseData = await response.json()

      if (response.ok) {
        console.log('job created successfully:', responseData)
        setJobResponse('job oprettet!')
      }
      if (!response.ok) {
        console.error('Failed to create job:', responseData)
        setJobResponse('Fejl ved oprettelse af job. Prøv igen.')
      }

    }
    catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='flex flex-col w-full'>
      {!authToken ? (
        <SectionContainerRed>
          <p>Du skal være logget ind for at oprette en annonce</p>
          <NavLink to='/login' className='text-main-red hover:text-main-red-hover'>Tryk her for at logge ind!</NavLink>
        </SectionContainerRed>
      ) : (
        <>
          <SectionContainerRed>
            <SectionTitle text='Opret en annonce og find frivillige til dine forening' />
          </SectionContainerRed>

          <SectionContainer>
            <form noValidate onSubmit={handleSubmit(createJob)} className='flex flex-col gap-4 w-[80vw]'>
              <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col'>
                  <FormLabel text='Overskrift' name='title' />
                  <input type="text" name='title' placeholder='Din overskrift...' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("title", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' }})} />
                  {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                </div>
                <div className='flex flex-col'>
                  <FormLabel text='Organisation / forening' name='organization' />
                  <input type="text" name='organization' placeholder='Din Organisation...' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("organization", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' }})} />
                  {errors.organization && <span className="text-red-500">{errors.organization.message}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                  <FormLabel text='Lokation' name='region'/>
                  <select name="regionId" id="regionId" {...register("regionId")}>
                    {regionData && regionData.map((region) => (
                      <option value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <FormLabel text='Kategori' name='jobCategoryId'/>
                  <select name="jobCategoryId" id="jobCategoryId" {...register("jobCategoryId")}>
                    {categoryData && categoryData.map((jobCategoryId) => (
                      <option value={jobCategoryId.id}>{jobCategoryId.name}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <FormLabel text='Arbejdstid' name='workTypeId' />
                  <select name="workTypeId" id="workTypeId" {...register("workTypeId")}>
                    {workTypesData && workTypesData.map((workTypes) => (
                      <option value={workTypes.id}>{workTypes.type}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <FormLabel text='Hjemmearbejde' name='workHome' />
                  <select name="workHome" id="workHome" {...register("workHome")}>
                    
                      <option value='On-site'>On-site</option>
                      <option value='Remote'>Remote</option>
                      <option value='Hybrid'>Hybrid</option>
                    
                  </select>
                </div>
                <div className='flex flex-col'>
                  <FormLabel text='Adresse' name='address' />
                  <input type="text" name='address' placeholder='Din addresse...' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("address", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' }})} />
                  {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                </div>
                <div className='flex flex-col'>
                  <FormLabel text='Post nummer' name='zipcode' />
                  <input type="text" placeholder='skriv dit post nummer..' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("zipcode", { required: true, pattern: { value: /^\d{4}$/, message: 'Må kun indeholde 4 tal' } })} />
                  {errors.zipcode && <><span className="text-red-500">{errors.zipcode.message}</span></>}
                </div>
                <div className='flex flex-col'>
                  <FormLabel text='By' name='city' />
                  <input type="text" name='city' placeholder='Din By...' className='bg-light-red px-4 py-2 rounded border border-border-gray' {...register("city", { required: true, pattern: { value: /^[A-Za-z0-9]+$/, message: 'Må ikke indeholde specialtegn' }})} />
                  {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                </div>
                
              </div>


              <div className='flex flex-col w-full'>
                <FormLabel text='Job Beskrivelse' />
                <textarea name="description" id="" className='resize-none h-full min-h-60 bg-light-red border border-border-gray rounded-2xl p-4' placeholder='Her kan du beskrive jobbet, hvilke erfaringer der kræves og hvad der forventes af den frivillige...' {...register('description', { required: 'Indtast en beskrivelse', pattern: { value: /^[A-Za-z0-9\s\.,!?]+$/, message: 'Beskrivelsen må kun indeholde bogstaver, tal, mellemrum og punktuering' } })}></textarea>
              </div>
              </div>
              <Button type='submit' text='Opret annonce' />
              <span>{jobResponse}</span>
            </form>
          </SectionContainer>

        </>
      )
      }
    </div>
  )
}