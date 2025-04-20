import base64
import io
import sys
from PIL import Image, ImageFilter
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.image as mpimg
import torchvision
import torchvision.transforms as transforms

def main():
    class EdgeDetect:
        def __call__(self, img):
            img = img.convert('L')
            img = img.filter(ImageFilter.FIND_EDGES).point(lambda p: p > 20 and 255)
            return img

    class CNN(nn.Module):
        def __init__(self):
            super().__init__()
            self.conv1 = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, padding=1)
            self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1)
            self.conv3 = nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, padding=1)
            self.pool = nn.MaxPool2d(kernel_size=2, stride=2)

            self.flatten = nn.Flatten()
            self.fc1 = nn.Linear(in_features=128 * 25 * 25, out_features=512)
            self.fc2 = nn.Linear(in_features=512, out_features=128)
            self.fc3 = nn.Linear(in_features=128, out_features=29)

        def forward(self, x):
            x = self.pool(F.relu(self.conv1(x)))
            x = self.pool(F.relu(self.conv2(x)))
            x = self.pool(F.relu(self.conv3(x)))
            x = self.flatten(x)
            x = F.relu(self.fc1(x))
            x = F.relu(self.fc2(x))
            x = self.fc3(x)
            return x

    image_data_url = sys.stdin.read().strip()
    if image_data_url.startswith('data:image'):
        image_data_url = image_data_url.split(',')[1]

    image_data = base64.b64decode(image_data_url)
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((200, 200))

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model_path = 'C:\\Users\\me03h\\Desktop\\nextjs-appwrite\\src\\app\\actions\\CNN_MODEL\\CNN_Model_2.pth'
    model_weights = torch.load(model_path, map_location=device, weights_only=False)

    CNN = CNN().to(device)
    CNN.load_state_dict(model_weights)
    CNN.eval()

    classes = (
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z', 'del', 'nothing', 'space')

    # img is 200x200 jpg
    # then transformed to tensor and normalized

    img = mpimg.imread('C:\\Users\\me03h\\Desktop\\nextjs-appwrite\\src\\app\\actions\\CNN_MODEL\\A_test.jpg')

    transform = transforms.Compose([
        transforms.Resize((200, 200)),
        EdgeDetect(), # convert images to gray scale and then detect edges
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
        ])
    tensor_img = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = CNN(tensor_img)
    _, predicted = torch.max(output, 1)

    print(classes[predicted.item()])
    return classes[predicted.item()]

if __name__ == '__main__':
    main()