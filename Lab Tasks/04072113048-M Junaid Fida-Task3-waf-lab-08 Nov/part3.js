// 3. Write a node script that prompts your name. Validate against the rule that the
// first letter of your name should be a capital letter. After the input and validation,
// display your name on the console with the text color of your choice and
// the background color of your choice. 
import chalk from "chalk";
import prompt from "prompt";

console.log(chalk.blue("Hello World"),chalk.bold.redBright("!"));


prompt.start();

prompt.get(['username'], (err, result) => {
    if (err) {
        console.error("Error getting input.");
        return;
    }

    const name = result.username;

    const firstChar = name.charAt(0);
    if (firstChar >= 'A' && firstChar <= 'Z') {
                console.log(chalk.blueBright.bold.bgWhite(`Your name is: ${name}`));
    } else {
        console.log(chalk.red("Invalid name. The first letter should be uppercase."));
    }
});
