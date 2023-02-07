import json
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers
from keras.models import model_from_json


def create_network():
    # Model / data parameters
    num_classes = 10
    input_shape = (28, 28, 1)

    # Build the model
    model = keras.Sequential(
        [
            keras.Input(shape=input_shape),
            layers.Flatten(),
            layers.Dense(128, activation="relu"),
            layers.Dense(num_classes, activation="softmax")
        ]
    )
    # model = keras.Sequential(
    #     [
    #         keras.Input(shape=input_shape),
    #         layers.Conv2D(32, kernel_size=(3, 3), activation="relu"),
    #         layers.MaxPooling2D(pool_size=(2, 2)),
    #         layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
    #         layers.MaxPooling2D(pool_size=(2, 2)),
    #         layers.Flatten(),
    #         layers.Dropout(0.5),
    #         layers.Dense(num_classes, activation="softmax"),
    #     ]
    # )

    model.summary()

    serialized_model = model.to_json()
    return serialized_model


def train_network(serialized_model, serialized_weights=None):
    model = model_from_json(serialized_model)

    if serialized_weights:
        weights_list = json.loads(serialized_weights)
        weights = [np.array(w) for w in weights_list]
        model.set_weights(weights)

    # Model / data parameters
    num_classes = 10

    # Load the data and split it between train and test sets
    (x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

    # Scale images to the [0, 1] range
    x_train = x_train.astype("float32") / 255
    x_test = x_test.astype("float32") / 255
    # Make sure images have shape (28, 28, 1)
    x_train = np.expand_dims(x_train, -1)
    x_test = np.expand_dims(x_test, -1)
    print("x_train shape:", x_train.shape)
    print(x_train.shape[0], "train samples")
    print(x_test.shape[0], "test samples")


    # Convert class vectors to binary class matrices
    y_train = keras.utils.to_categorical(y_train, num_classes)
    y_test = keras.utils.to_categorical(y_test, num_classes)

    # Train the model
    batch_size = 125
    epochs = 5

    model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

    model.fit(x_train, y_train, batch_size=batch_size, epochs=epochs, validation_split=0.1)


    #Evaluate the trained model
    score = model.evaluate(x_test, y_test, verbose=0)
    print("Test loss:", score[0])
    print("Test accuracy:", score[1])


    # Convert numpy array to list
    weights = model.get_weights()
    weights_list = [w.tolist() for w in weights]
    # Serialize list to JSON
    weights_json = json.dumps(weights_list)
    return weights_json, score[1]
