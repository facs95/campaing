
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import {Link} from '../routes';

const AddButton = () => (
  <div>
    <Link route='/campaing/new'>
        <Button primary floated='right' animated style={{margin:'10px'}}>
        <Button.Content visible>Create campaing!</Button.Content>
        <Button.Content hidden>
            <Icon name='add' />
        </Button.Content>
        </Button>
    </Link>  
  </div>
)

export default AddButton;