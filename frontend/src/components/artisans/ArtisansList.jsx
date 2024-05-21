import PropTypes from 'prop-types'
import ArtisansListItem from './ArtisansListItem'

function ArtisansList ({ artisans }) {
  if (!artisans || artisans.length < 1) {
    return 'No data'
  }
  return (
    <div className='flex flex-col'>
      <h2 className='text-4xl py-6'>Artisans List</h2>
      <div className='flex flex-row flex-wrap gap-4'>
        {
          artisans.map(artisan => (
            <ArtisansListItem key={artisan.id} artisan={artisan} />
          ))
        }
      </div>
    </div>
  )
}

ArtisansList.propTypes = {
  artisans: PropTypes.arrayOf(PropTypes.object)
}

export default ArtisansList
