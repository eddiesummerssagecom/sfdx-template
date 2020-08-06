/**
 * Placeholder to show the default source directory. As configured, the deployment
 * commands will find resources in src/main/default.
 */
public with sharing class SampleClass {

    public void doSomething() {
        System.debug(LoggingLevel.INFO, 'Hello world!');
    }
}
