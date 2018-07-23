import React from 'react'
import { Layout, Card, SkeletonBodyText } from '@shopify/polaris'

class SkeletonScreen extends React.Component {

  render() {
    return (
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText lines={7}/>
            </Card>
            <Card sectioned>
              <SkeletonBodyText lines={7}/>
            </Card>
            <Card sectioned >
              <SkeletonBodyText lines={7}/>
            </Card>
            <Card sectioned >
              <SkeletonBodyText lines={7}/>
            </Card>
            <Card sectioned >
              <SkeletonBodyText lines={7}/>
            </Card>
          </Layout.Section>
        </Layout>
    )
  }
}

export default SkeletonScreen