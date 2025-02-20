import {person} from './documents/person'
import {page} from './documents/OG_page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import contactHero from './objects/contactHero'
import equipmentGrid from './objects/equipmentGrid'
import grid from './objects/grid'
import hero from './objects/hero'
import contactForm from './objects/contactForm'
import cta from './objects/cta'
import downloadableFile from './objects/downloadableFile'
import equipmentReference from './objects/equipmentReference'
import mainImage from './objects/mainImage'
import openGraph from './objects/openGraph'
import pagePortableText from './objects/pagePortableText'
import customComponentContainer from './objects/customComponentContainer'
import navigation from './documents/navigation'
import siteSettings from './documents/siteSettings'
import usedEquipment from './documents/usedEquipment'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  navigation,
  page,
  post,
  person,
  siteSettings,
  usedEquipment,
  // Objects
  blockContent,
  callToAction,
  contactForm,
  contactHero,
  cta,
  customComponentContainer,
  downloadableFile,
  equipmentGrid,
  equipmentReference,
  grid,
  hero,
  infoSection,
  link,
  mainImage,
  openGraph,
  pagePortableText,
]
