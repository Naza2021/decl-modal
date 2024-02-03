
import CodeBlock from '@theme/CodeBlock';
import fileContent from './getFileContent'

export const ExampleComponent = ({ name }) => {
    return <CodeBlock language='tsx'>
        {fileContent[name]}
    </CodeBlock>
}