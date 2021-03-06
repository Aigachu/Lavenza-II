/**
 * Project Lavenza
 * Copyright 2017-2019 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */

// Imports.
import { Sojiro } from "../Confidant/Sojiro";
import { Core } from "../Core/Core";
import { CoreStatus } from "../Core/CoreStatus";
import { Service } from "../Service/Service";
import { ServiceContainer } from "../Service/ServiceContainer";
import { AbstractObject } from "../Types";

import { Composer } from "./Composer/Composer";
import { Chronicler } from "./StorageService/Chronicler/Chronicler";
import { StorageService } from "./StorageService/StorageService";

/**
 * Gestalt manages the storage and retrieval of JSON type data.
 *
 * The name? Well, I just like how it sounds. Haha!
 *
 * Gestalt: "An organized whole that is perceived as more than the sum of its parts."
 *
 * This class serves as the bridge towards the main StorageService that Lavenza will be using. A Storage Service is
 * essentially the service that will access the database of the application, wherever it is stored. It is the job
 * of the StorageService to determine what type of data storage it will access, and the responsibility of it to
 * implement the necessary methods for Lavenza to work. It MUST adopt the structure of a REST protocol: GET
 * POST, UPDATE & DELETE.
 *
 * We want to keep things simple and store JSON type data. In the future, we may explore SQL storage and the like.
 * i.e. MongoDB!
 */
export class Gestalt extends Service {

  /**
   * The storage service that Gestalt will use.
   *
   * This will determine what kind of database storage we'Ll be using.
   */
  private storageService: StorageService;

  /**
   * Perform Gestalt's genesis tasks.
   *
   * @inheritDoc
   */
  public async genesis(): Promise<void> {
    // The default storage service is the Chronicler.
    /** @see ./StorageService/Chronicler/Chronicler */
    // @TODO - Dynamic selection of StorageService instead of having to save it here.
      //  Maybe .env variables? Or a configuration file at the root of the application.
    const storageService: StorageService = new Chronicler();

    // Await the build process of the storage service and assign it to Gestalt.
    await storageService.synthesis();
    this.storageService = storageService;
  }

  /**
   * Perform Gestalt's statis tasks.
   *
   * During statis, the main Gestalt service will load all services that hold the "composer" tag.
   *
   * These services will implement a compose() function that is used to instantiate and bootstrap all database tables
   * and collections needed for the application to run appropriately.
   *
   * @inheritDoc
   */
  public async statis(): Promise<void> {
    // We'll only do the following tasks if the Core is in the proper status.
    // Composers will only run if the Lavenza Core is completely finished preparations.
    if (Core.status !== CoreStatus.statis) {
      return;
    }

    // Obtain all composer services.
    const composers = ServiceContainer.getServicesWithTag("composer") as Composer[];

    // Sort resonators in order of defined priority.
    composers.sort((a, b) => b.priority - a.priority);

    // Run them all.
    for (const composer of composers) {
      // For each composer, we run the compose() function.
      await composer.compose();
    }
  }

  /**
   * Create a collection in the storage service.
   *
   * We need to keep in mind that we're using mostly JSON storage in this context.
   * This makes use of Collections & Items.
   *
   * @param endpoint
   *   Location where to create the collection.
   * @param payload
   *   The data of the Collection to create.
   */
  public async createCollection(endpoint: string, payload: {} = {}): Promise<void> {
    // Each storage service creates collections in their own way. We await this process.
    await this.storageService.createCollection(endpoint, payload);
  }

  /**
   * Process a DELETE request using the storage service.
   *
   * @param endpoint
   *   Path to delete data at.
   */
  public async delete(endpoint: string): Promise<void> {
    // Await DELETE request of the Storage Service.
    await this.request({protocol: "delete", endpoint});
  }

  /**
   * Process a GET request using the storage service.
   *
   * @param endpoint
   *   Path to get data from.
   *
   * @returns
   *   Data retrieved from the given endpoint.
   */
  public async get(endpoint: string): Promise<{}> {
    // Await GET request of the Storage Service.
    return this.request({protocol: "get", endpoint});
  }

  /**
   * Process a POST request using the storage service.
   *
   * @param endpoint
   *   Path to push data to.
   * @param payload
   *   Data to push to the endpoint.
   *
   * @returns
   *   The data that was posted, if requested.
   */
  public async post(endpoint: string, payload: {}): Promise<{} | undefined> {
    // Await POST request of the Storage Service.
    return this.request({protocol: "post", endpoint, payload});
  }

  /**
   * Make a request using the storage service.
   *
   * The linked storage service implements it's own methods of storing and accessing data. Gestalt simply calls those.
   *
   * @param protocol
   *   The protocol we want to use.
   *   The are four: GET, POST, UPDATE, DELETE.
   *    - GET: Fetch and retrieve data from a path/endpoint.
   *    - POST: Create data at a path/endpoint.
   *    - UPDATE: Adjust data at a path/endpoint.
   *    - DELETE: Remove data at a path/endpoint.
   * @param endpoint
   *   The string path/endpoint of where to apply the protocol.
   * @param payload
   *   The data, if needed, to apply the protocol. GET/DELETE will not need a payload.
   *
   * @returns
   *   The result of the protocol call.
   */
  public async request({protocol = "", endpoint = "", payload = {}}: AbstractObject = {})
    : Promise<{} | undefined> {
    // Await the request function call of the storage service.
    return this.storageService.request({protocol, endpoint, payload});
  }

  /**
   * Synchronize data between the active storage service and the defaults in the code.
   *
   * @param config
   *   Configuration to sync to the selected source.
   * @param source
   *   The source that needs to be synced.
   *
   * @returns
   *   The result of the data being synchronized with the provided source endpoint.
   */
  public async sync(config: {}, source: string): Promise<{}> {
    // Await initial fetch of data that may already exist.
    const dbConfig: {} = await this.get(source);

    // If the configuration already exists, we'll want to sync the provided configuration with the source.
    // We merge both together. This MIGHT NOT be necessary? But it works for now.
    if (!Sojiro.isEmpty(dbConfig)) {
      return {...config, ...dbConfig};
    }

    // Await creation of database entry for the configuration, since it doesn't exist.
    await this.post(source, config);

    return config;
  }

  /**
   * Process a UPDATE request using the storage service.
   *
   * @param endpoint
   *   Path to push data to.
   * @param payload
   *   Data to update at the endpoint.
   *
   * @returns
   *   The resulting state of the data that was updated, if applicable.
   */
  public async update(endpoint: string, payload: {}): Promise<{} | undefined> {
    // Await UPDATE request of the Storage Service.
    return this.request({protocol: "update", endpoint, payload});
  }

}
