export default class Utility{
    static getCustomElement(elementName, options){
        const element = document.createElement(elementName);
        if(options.attributes){
            options.attributes.forEach(attribute => {
                element.setAttribute(attribute.name, attribute.value);
            });
        }
        if(options.classes){
            let firstIteration = true;
            let classAttributes = '';
            
            options.classes.forEach(classAttribute => {
                if(firstIteration){
                    firstIteration = false;
                    classAttributes = classAttribute;
                    return;
                }
                classAttributes += ` ${classAttribute}`;
            });
            element.setAttribute('class', classAttributes);
        }
        if(options.id){
            element.setAttribute('id', options.id);
        }
        if(options.content){
            element.innerHTML = options.content;
        }
        return element;
    }
}